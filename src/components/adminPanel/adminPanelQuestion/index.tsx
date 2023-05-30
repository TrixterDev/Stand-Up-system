import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import st from "./style.module.sass";
import Btn from "../../ui/Btn/Btn";
import Input from "../../ui/Input/Input";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import clsx from "clsx";
import { Loader } from "../../ui/Loader";
import {
  getCategories,
  getQuestions,
  removeQuestions,
  updateCategories,
  updateQuestions,
} from "../../../api";

interface Category {
  id: string;
  category_name: string;
  edit: boolean;
}

interface Question {
  id: string;
  title: string;
  edit: boolean;
  deleteTimer?: number;
  deleted?: boolean;
  category: string;
  category_id: string;
}

const PanelQuestion = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionsBasket, setQuestionsBasket] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

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
        setActiveCategory({
          category_name:
            categoriesData[0]?.attributes.category.data.attributes
              .category_name,
          category_id: questionsData[0]?.attributes.category.data.id,
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

  const addQuestion = () => {
    if (activeCategory) {
      const newQuestion: Question = {
        id: uuidv4(),
        title: "",
        edit: true,
        category: activeCategory.category_name,
        category_id: activeCategory.id,
      };
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    }
  };

  const save = async () => {
    setLoading(true);

    try {
      await updateCategories(categories);

      const updateQuestionsPromises = questions.map((question) =>
        updateQuestions(question)
      );
      await Promise.all(updateQuestionsPromises);

      if (questionsBasket.length > 0) {
        await removeQuestions(questionsBasket);
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
      { category_name: "", edit: true, id: uuidv4() },
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
                key={item.id}
              >
                {item.category_name}
              </button>
            );
          } else {
            return (
              <div
                className={clsx(
                  st.tab,
                  activeCategory === item.category_name && st.active
                )}
                key={item.id}
              >
                <input
                  value={item.category_name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    changeCategory(e, item.id)
                  }
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
        {questions.map((item: Question) => {
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
                  </div>
                )}
              </article>
            );
          }
          return null;
        })}
      </div>
    </section>
  );
};

export default PanelQuestion;
