import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import st from "./style.module.sass";
import Btn from "../../ui/Btn/Btn";
import Input from "../../ui/Input/Input";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import clsx from "clsx";
import { Loader } from "../../ui/Loader";
import {
  getCategories,
  getQuestions,
  removeQuestions,
  strapiAPI,
  updateCategories,
  updateQuestions,
} from "../../../api";

export interface Question {
  id: string;
  title: string;
  edit?: boolean;
  deleteTimer?: any;
  deleted?: boolean;
  category?: string;
}

interface Category {
  id: any;
  category_name: string;
  edit?: boolean;
}

const PanelQuestion = () => {
  const [questions, setQuestions] = useState<Question[]>([
    // {
    //   id: uuidv4(),
    //   title: "Столица германии?",
    //   category: "germany",
    // },
    // {
    //   id: uuidv4(),
    //   title: "Столица Португалии?",
    //   category: "portugal",
    // },
    // {
    //   id: uuidv4(),
    //   title: "Столица Кыргызстан?",
    //   category: "kyrgyzstan",
    // },
  ]);
  useEffect(() => {
    setLoading(true);

    getCategories().then((resp: any) => {
      setCategories(
        resp.data.map((item: any) => {
          console.log(item);
          return { ...item.attributes, edit: false, id: item.id };
        })
      );

      getQuestions().then((questionResponse: any) => {
        setActiveCategory({
          category_name:
            questionResponse.data[0].attributes.category.data.attributes
              .category_name,
          category_id: questionResponse.data[0].attributes.category.data.id,
        });
        setQuestions(
          questionResponse.data.map((item: any) => {
            return {
              ...item.attributes,
              id: item.id,
              edit: false,
              category: item.attributes.category.data.attributes.category_name,
              category_id: item.attributes.category.data.id,
            };
          })
        );
        setLoading(false);
      });
    });
  }, []);

  const [questionsBasket, setQuestionsBasket] = useState<Question[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [categories, setCategories] = useState<any>([
    // { category_name: "kyrgyzstan", id: uuidv4(), edit: false },
    // { category_name: "portugal", id: uuidv4(), edit: false },
    // { category_name: "germany", id: uuidv4(), edit: false },
  ]);

  const [activeCategory, setActiveCategory] = useState<any | null>();

  const [basket, setBasket] = useState([]);

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

        // return updatedBasket.filter((item) => !item.deleted);
        return updatedBasket;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        id: uuidv4(),
        title: "",
        edit: true,
        category: activeCategory.category_name,
        category_id: activeCategory.id,
      },
    ]);
    // addQuestion();
  };

  const save = async () => {
    setLoading(true);
    await updateCategories(categories).then((resp) => {
      console.log(resp);
    });

    await updateQuestions(questions).then((resp) => {
      console.log(resp);
    });

    if (questionsBasket) {
      await removeQuestions(questionsBasket).then((resp) => {
        console.log(resp);
      });
    }

    setLoading(false);
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
      const updatedQuestions = prev.map((item) => {
        if (item.id === id) {
          return { ...item, edit: status };
        } else {
          return item;
        }
      });
      return updatedQuestions;
    });
  };

  const changeCategoryStatus = (id: string, status: boolean) => {
    setCategories((prev) => {
      const updatedCategories = prev.map((item: Category) => {
        if (item.id === id) {
          return { ...item, edit: status };
        } else {
          return item;
        }
      });
      return updatedCategories;
    });
  };

  const addCategory = () => {
    setCategories((prev: any) => {
      return [
        ...prev,
        {
          category_name: "",
          edit: true,
          id: uuidv4(),
        },
      ];
    });
  };

  const change = (e: React.ChangeEvent<HTMLInputElement>, id: any) => {
    setQuestions((prev) => {
      const updatedQuestions = prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [e.target.name]: e.target.value,
          };
        } else {
          return item;
        }
      });
      return updatedQuestions;
    });
  };

  const changeCategory = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setCategories((prev: any) => {
      const updatedCategories = prev.map((item: any) => {
        if (item.id === id) {
          return { ...item, [e.target.name]: e.target.value };
        } else {
          return item;
        }
      });
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
        <h4>
          Категории <button onClick={addCategory}>Добавить категорию</button>
        </h4>
        <button onClick={save} className={st["save-btn"]}>
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
        })}
      </div>

      <div className={st.tabs}>
        {categories.map((item: Category, index: number) => {
          if (!item.edit) {
            return (
              <button
                className={clsx(
                  st.tab,
                  activeCategory &&
                    activeCategory.category_name === item.category_name &&
                    st.active
                )}
                onClick={() =>
                  setActiveCategory({
                    category_name: item.category_name,
                    id: item.id,
                  })
                }
              >
                {item.category_name}
              </button>
            );
          } else {
            return (
              <div
                key={item.id}
                className={clsx(
                  st.tab,
                  activeCategory === item.category_name && st.active
                )}
              >
                <input
                  value={item.category_name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    changeCategory(e, item.id)
                  }
                  name="category_name"
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
        {questions.map((item: Question) => {
          if (item.category === activeCategory.category_name) {
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
                        change(e, item.id)
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
                  </div>
                )}
              </article>
            );
          }
        })}
      </div>
    </section>
  );
};

export default PanelQuestion;
