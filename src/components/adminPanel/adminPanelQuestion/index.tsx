import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import st from "./style.module.sass";
import Btn from "../../ui/Btn/Btn";
import Input from "../../ui/Input/Input";
import {
  FaCross,
  FaEdit,
  FaPlus,
  FaTimes,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";
import clsx from "clsx";
import { Loader } from "../../ui/Loader";
import {
  getCategories,
  getQuestionById,
  getQuestions,
  getUserInfo,
  getUserInfoByUsername,
  getUsers,
  removeCategories,
  removeQuestions,
  updateCategories,
  updateQuestionById,
  updateQuestions,
} from "../../../api";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { Modal } from "../../ui/Modal";
import { useNavigate } from "react-router";
import { Autocomplete, Box, Button, TextField, Tooltip } from "@mui/material";
import { useSnackbar } from "notistack";

interface Category {
  id: string;
  category_name: string;
  edit: boolean;
  deleted?: boolean;
}

interface Question {
  id: string;
  title: string;
  edit: boolean;
  deleteTimer?: number;
  deleted?: boolean;
  category: string;
  category_id: string;
  createdAt: string;
}

interface ActiveCategory {
  category_name: string;
  id: number;
}

const PanelQuestion = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionsBasket, setQuestionsBasket] = useState<Question[]>([]);
  const [categoriesBasket, setCategoriesBasket] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<ActiveCategory | null>(
    null
  );

  const [modalUsersVisible, setModalUsersVisible] = useState<boolean>(false);

  const [modalUsers, setModalUsers] = useState<object>({
    users: [],
    questionId: null,
  });

  const [addingNewUserForm, setAddingNewUserForm] = useState({
    userId: null,
    error: null,
  });

  const [autoCompleteUsers, setAutoCompleteUsers] = useState<any[] | null>(
    null
  );

  const [addUserField, setAddUserField] = useState<string | null>(null);
  const [permissionUserLoading, setPermissionsUserLoading] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const categoriesResponse = await getCategories();
        const categoriesData = categoriesResponse.data.map((item: any) => ({
          ...item.attributes,
          edit: false,
          id: item.id,
        }));
        setCategories(categoriesData);

        const questionsResponse = await getQuestions();
        const questionsData = questionsResponse.data.map((item: any) => ({
          ...item.attributes,
          id: item.id,
          edit: false,
          category: item.attributes.category.data.attributes.category_name,
          category_id: item.attributes.category.data.id,
        }));
        setQuestions(questionsData);

        getUsers().then((resp) => setAutoCompleteUsers(resp));
        console.log(categoriesData);
        setActiveCategory({
          category_name: categoriesData[0].category_name,
          id: categoriesData[0].id,
        });
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuestionsBasket((prevBasket) => {
        const updatedBasket = prevBasket.map((item) => {
          if (item.deleteTimer === 0) {
            return { ...item, deleted: true };
          } else {
            return { ...item, deleteTimer: item.deleteTimer - 1 };
          }
        });

        return updatedBasket;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCategoriesBasket((prevBasket) => {
        const updatedBasket = prevBasket.map((item) => {
          if (item.deleteTimer === 0) {
            return { ...item, deleted: true };
          } else {
            return { ...item, deleteTimer: item.deleteTimer - 1 };
          }
        });

        return updatedBasket;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const addQuestion = () => {
    if (activeCategory) {
      const newQuestion: Question = {
        id: uuidv4(),
        title: "",
        edit: true,
        category: activeCategory.category_name,
        category_id: activeCategory.id,
        createdAt: new Date(),
      };
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    }
  };

  const addUserToQuestion = (index: number) => {
    setModalUsers({
      users: questions[index].access_users.data,
      question: questions[index],
    });

    setModalUsersVisible(true);
  };

  const addUserToQuestionFunc = () => {
    setPermissionsUserLoading(true);

    const fetchData = async () => {
      try {
        let userId = null;
        await getUserInfoByUsername(addUserField).then((resp) => {
          if (resp.length > 0) {
            userId = resp[0].id;
          } else {
            enqueueSnackbar("User not found", { variant: "error" });
          }
        });

        await getQuestionById(modalUsers.question.id)
          .then((resp) => {
            return {
              ...resp.data.attributes,
              access_users: {
                disconnect: [],
                connect: [{ id: userId }],
              },
            };
          })
          .then((resp) => {
            console.log(resp);
            updateQuestionById(resp, modalUsers.question.id).then((resp) => {
              setModalUsers((prev) => {
                return {
                  ...prev,
                  users: resp.data.attributes.access_users.data,
                };
              });
              enqueueSnackbar("Пользователь был успешно привязан", {
                variant: "success",
              });
            });

            setQuestions((prev) => {
              const questions = [...prev];
              const index = questions.findIndex(
                (item) => item.id === modalUsers.question.id
              );
              console.log(index);
              questions.splice(index, 1, {
                ...resp,
                id: resp.id,
                edit: false,
                category: resp.category.data.attributes.category_name,
                category_id: resp.category.data.id,
              });
              console.log(questions);
              return [...prev];
            });
          });
      } catch (error) {
        console.log("Error", error);
        enqueueSnackbar("При добавлении пользователя возникла ошибка", {
          variant: "error",
        });
      } finally {
        setPermissionsUserLoading(false);
      }
    };

    fetchData();
  };

  const save = async () => {
    setLoading(true);

    try {
      await updateCategories(categories);

      await updateQuestions(questions);

      if (questionsBasket.length > 0) {
        await removeQuestions(questionsBasket);
      }

      if (categoriesBasket.length > 0) {
        await removeCategories(categoriesBasket, questions);
      }

      console.log("Save successful");
    } catch (error) {
      console.log("Error saving data:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeQuestion = (id: string) => {
    const removedQuestion = questions.find((item) => item.id === id);
    if (removedQuestion) {
      setQuestions((prev) => prev.filter((item) => item.id !== id));
      setQuestionsBasket((prevBasket) => [
        ...prevBasket,
        { ...removedQuestion, deleteTimer: 3 },
      ]);
    }
  };

  const returnCategory = (id: string) => {
    const returnedCategory = categoriesBasket.find((item) => item.id === id);
    if (returnedCategory) {
      setCategoriesBasket((prevBasket) =>
        prevBasket.filter((item) => item.id !== id)
      );
      setCategories((prevCategories) => [...prevCategories, returnedCategory]);
    }
  };

  const returnQuestion = (id: string) => {
    const returnedQuestion = questionsBasket.find((item) => item.id === id);
    if (returnedQuestion) {
      setQuestionsBasket((prevBasket) =>
        prevBasket.filter((item) => item.id !== id)
      );
      setQuestions((prevQuestions) => [...prevQuestions, returnedQuestion]);
    }
  };

  const changeEditStatus = (id: string, status: boolean) => {
    setQuestions((prev) => {
      const updatedQuestions = prev.map((item) =>
        item.id === id ? { ...item, edit: status } : item
      );
      return updatedQuestions;
    });
  };

  const removeCategory = (id: string) => {
    const removedCategory = categories.find((item) => item.id === id);
    if (removedCategory) {
      setCategories((prev) => prev.filter((item) => item.id !== id));
      setCategoriesBasket((prevBasket) => [
        ...prevBasket,
        { ...removedCategory, deleteTimer: 3 },
      ]);
    }
  };

  const changeCategoryStatus = (id: string, status: boolean) => {
    setCategories((prev) => {
      const updatedCategories = prev.map((item) =>
        item.id === id ? { ...item, edit: status } : item
      );
      return updatedCategories;
    });
  };

  const addCategory = () => {
    setCategories((prev) => [
      ...prev,
      { category_name: "", edit: true, id: null },
    ]);
  };

  const change = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    field: string
  ) => {
    setQuestions((prev) => {
      const updatedQuestions = prev.map((item) =>
        item.id === id ? { ...item, [field]: e.target.value } : item
      );
      return updatedQuestions;
    });
  };

  const changeCategory = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setCategories((prev) => {
      const updatedCategories = prev.map((item) =>
        item.id === id ? { ...item, category_name: e.target.value } : item
      );
      return updatedCategories;
    });
  };

  return (
    <section className={st.container}>
      {loading && (
        <div className={clsx(st["loader-wrap"], loading && st.active)}>
          <Loader />
        </div>
      )}
      <div className={st["category-header"]}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h4>Категории </h4>
          <button
            className={st["add-circle-btn"]}
            onClick={addCategory}
            title="Добавить категорию"
          >
            <FaPlus />
          </button>
        </div>
        <button
          onClick={save}
          className={st["save-btn"]}
          title="Сохранить все изменения"
        >
          Сохранить
        </button>
      </div>
      <div className={st.basket}>
        {questionsBasket.map((item) => {
          if (!item.deleted) {
            return (
              <div className={st["basket-card"]} key={item.id}>
                <p>
                  <strong>{item.title || "Пустой вопрос"}</strong>{" "}
                  {item.category_name} Удалится через {item.deleteTimer}
                </p>
                <button
                  className={st["return-btn"]}
                  onClick={() => returnQuestion(item.id)}
                >
                  Вернуть
                </button>
              </div>
            );
          }
          return null;
        })}

        {categoriesBasket.map((item) => {
          if (!item.deleted) {
            return (
              <div className={st["basket-card"]} key={item.id}>
                <p>
                  <strong>{item.category_name || "Пустая категория"}</strong>{" "}
                  Удалится через {item.deleteTimer}
                </p>
                <button
                  className={st["return-btn"]}
                  onClick={() => returnCategory(item.id)}
                >
                  Вернуть
                </button>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="tabs">
        {categories.map((item: Category, index: number) => {
          if (!item.edit) {
            return (
              <div className={st["category"]} key={item.id}>
                <div className={st["category-tools"]}>
                  <button
                    onClick={() => changeCategoryStatus(item.id, true)}
                    className={st["category-btn"]}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => removeCategory(item.id)}
                    className={st["category-btn"]}
                  >
                    {" "}
                    {/* Add onClick handler */}
                    <FaTrash />
                  </button>
                </div>
                <button
                  className={clsx(
                    "tab",
                    activeCategory &&
                      activeCategory.category_name === item.category_name &&
                      "active"
                  )}
                  onClick={() =>
                    setActiveCategory({
                      category_name: item.category_name,
                      id: item.id,
                    })
                  }
                  key={item.id}
                >
                  {item.category_name}
                </button>
              </div>
            );
          } else {
            return (
              <div
                className={clsx(
                  "tab",
                  activeCategory === item.category_name && "active"
                )}
                key={item.id}
              >
                <input
                  value={item.category_name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    changeCategory(e, item.id)
                  }
                  value={categories[index].category_name}
                  name="category_name"
                  autoFocus
                />

                <button onClick={() => changeCategoryStatus(item.id, false)}>
                  Сохранить
                </button>
              </div>
            );
          }
        })}
      </div>
      <h4>
        Вопросы в категории {activeCategory && activeCategory.category_name}
      </h4>
      <Btn
        textBtn={`Добавить вопрос в категорию ${
          activeCategory && activeCategory.category_name
        }`}
        dC={st.button}
        onClick={addQuestion}
      />

      <div className={st.cards}>
        {questions.map((item: Question, index: number) => {
          if (item.category === activeCategory?.category_name) {
            return (
              <article className={st.card} key={item.id}>
                {item.edit ? (
                  <>
                    <Input
                      pHText="Введите вопрос"
                      value={item.title}
                      secondClass={st.input}
                      name="title"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        change(e, item.id, "title")
                      }
                    />
                    <Btn
                      textBtn="Сохранить"
                      dC={st["add-btn"]}
                      onClick={() => {
                        if (item.title !== "") {
                          changeEditStatus(item.id, false);
                        } else {
                          alert("Вы не можете создать пустой вопрос");
                        }
                      }}
                    />
                    <Btn
                      textBtn="Удалить"
                      dC={st["cancel-btn"]}
                      onClick={() => removeQuestion(item.id)}
                    />
                  </>
                ) : (
                  <div className={st["card-content"]}>
                    <h2>{item.title}</h2>
                    <div className={st["question-controls"]}>
                      <FaEdit onClick={() => changeEditStatus(item.id, true)} />
                      <FaTrashAlt onClick={() => removeQuestion(item.id)} />
                    </div>

                    <div className={st["question-info"]}>
                      {format(
                        typeof item.createdAt === "string"
                          ? parseISO(item.createdAt)
                          : item.createdAt,
                        "dd MMM, yyyy",
                        {
                          locale: ru,
                        }
                      )}
                    </div>

                    <div className={st["user-view"]}>
                      {item.access_users &&
                        item.access_users.data.map((item, index) => {
                          if (index < 3) {
                            return (
                              <img
                                src={
                                  item.attributes.avatarka.data?.attributes
                                    ?.url || "/img/base-avatar.png"
                                }
                                alt={item.username}
                                className={st.avatar}
                                title={item.username}
                              />
                            );
                          }
                        })}
                      <button
                        className={st["add-circle-btn"]}
                        title="Добавить нового пользователя"
                        onClick={() => addUserToQuestion(index)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          }
          return null;
        })}

        <Modal
          isVisible={modalUsersVisible}
          setIsVisible={setModalUsersVisible}
        >
          <h4>Отображение</h4>
          <p>Этим пользователям будет отображаться этот вопрос:</p>
          <ul className={st["users-list"]}>
            {modalUsers.users.map((item, index) => {
              return (
                <Tooltip
                  title={
                    <React.Fragment>
                      <div className={st["user-info-card"]}>
                        <img
                          src={
                            item.attributes.avatarka.data?.attributes?.url ||
                            "/img/base-avatar.png"
                          }
                          style={{ width: 25, height: 25, borderRadius: "50%" }}
                        />

                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            <h5>{item.attributes.firstname}</h5>
                            <h5>{item.attributes.lastname}</h5>
                          </div>

                          <h4
                            style={{
                              color: item.attributes.online
                                ? "lime"
                                : "#ff4444",
                              fontSize: 14,
                            }}
                          >
                            {item.attributes.online ? "Онлайн" : "Оффлайн"}
                          </h4>
                          <h4 style={{ color: "#fff", fontSize: 14 }}>
                            @{item.attributes.username}
                          </h4>
                          <h4 style={{ color: "#fff", fontSize: 14 }}>
                            {item.attributes.email}
                          </h4>
                        </div>
                      </div>
                    </React.Fragment>
                  }
                  followCursor
                >
                  <li className={st["users-list-item"]}>
                    <img
                      src={
                        item.attributes.avatarka.data?.attributes?.url ||
                        "/img/base-avatar.png"
                      }
                      style={{ width: 25, height: 25, borderRadius: "50%" }}
                    />
                    <span onClick={() => navigate("/")}>
                      {item.attributes.username}
                    </span>

                    <button
                      onClick={() => {
                        setPermissionsUserLoading(true);

                        const fetchData = async () => {
                          try {
                            let userId = item.id;

                            getQuestionById(modalUsers.question.id)
                              .then((resp) => {
                                return {
                                  ...resp.data.attributes,
                                  access_users: {
                                    disconnect: [{ id: userId }],
                                    connect: [],
                                  },
                                };
                              })
                              .then((resp) => {
                                console.log(resp);
                                updateQuestionById(
                                  resp,
                                  modalUsers.question.id
                                ).then((resp) => {
                                  setModalUsers((prev) => {
                                    return {
                                      ...prev,
                                      users:
                                        resp.data.attributes.access_users.data,
                                    };
                                  });
                                });
                              });

                            enqueueSnackbar(
                              "Пользователь был успешно отвзязан",
                              {
                                variant: "success",
                              }
                            );
                          } catch (error) {
                            console.log(error);
                          } finally {
                            setPermissionsUserLoading(false);
                          }
                        };

                        fetchData();
                      }}
                    >
                      <FaTimes />
                    </button>
                  </li>
                </Tooltip>
              );
            })}
          </ul>

          <div className={st["users-adding-form"]}>
            {addingNewUserForm.error === "user not found" && (
              <span>Такого пользователя не сущетствует</span>
            )}
            <Autocomplete
              options={autoCompleteUsers || []}
              getOptionLabel={(option) => option.username}
              onChange={(event, value) =>
                setAddUserField(value?.username || "")
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Выберите пользователя"
                  onChange={(e) => setAddUserField(e.target.value)}
                />
              )}
            />

            <Button
              onClick={addUserToQuestionFunc}
              variant="contained"
              style={{
                backgroundColor: "#ffcc00",
                marginTop: 20,
                alignSelf: "center",
              }}
              disabled={permissionUserLoading}
            >
              Добавить
            </Button>
          </div>
          {/* <button className={st["add-btn"]}>Добавить пользователя</button> */}
        </Modal>
      </div>
    </section>
  );
};

export default PanelQuestion;
