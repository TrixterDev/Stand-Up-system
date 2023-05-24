import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import st from "./style.module.sass";
import Btn from "../../ui/Btn/Btn";
import Input from "../../ui/Input/Input";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import clsx from "clsx";

interface Question {
  id: string;
  title: string;
  edit?: boolean;
  deleteTimer?: any;
  deleted?: boolean;
  category?: string;
}

const PanelQuestion = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: uuidv4(),
      title: "Столица германии?",
      category: "germany",
    },
    {
      id: uuidv4(),
      title: "Столица Португалии?",
      category: "portugal",
    },
    {
      id: uuidv4(),
      title: "Столица Кыргызстан?",
      category: "kyrgyzstan",
    },
  ]);

  const [basket, setBasket] = useState<Question[]>([]);

  const [activeCategory, setActiveCategory] = useState<string>("portugal");

  const [categories, setCategories] = useState<any>([
    "kyrgyzstan",
    "portugal",
    "germany",
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setBasket((prevBasket) => {
        const updatedBasket = prevBasket.map((item) => {
          if (item.deleteTimer === 0) {
            return { ...item, deleted: true };
          } else {
            return { ...item, deleteTimer: item.deleteTimer - 1 };
          }
        });
        return updatedBasket.filter((item) => !item.deleted);
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { id: uuidv4(), title: "", edit: true, category: activeCategory },
    ]);
    // addQuestion();
  };

  const removeQuestion = (id: string) => {
    const removedQuestion = questions.find((item) => item.id === id);
    if (removedQuestion) {
      setQuestions((prev) => prev.filter((item) => item.id !== id));
      setBasket((prevBasket) => [
        ...prevBasket,
        { ...removedQuestion, deleteTimer: 5 },
      ]);
    }
  };

  const returnQuestion = (id: string) => {
    const returnedQuestion = basket.find((item) => item.id === id);
    if (returnedQuestion) {
      setBasket((prevBasket) => prevBasket.filter((item) => item.id !== id));
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

  const change = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setQuestions((prev) => {
      const updatedQuestions = prev.map((item) => {
        if (item.id === id) {
          return { ...item, [e.target.name]: e.target.value };
        } else {
          return item;
        }
      });
      return updatedQuestions;
    });
  };

  return (
    <section className={st.container}>
      <h4>Категории</h4>
      <div className={st.basket}>
        {basket.map((item) => (
          <div className={st["basket-card"]} key={item.id}>
            <p>
              <strong>{item.title || "Пустой вопрос"}</strong> Удалится через{" "}
              {item.deleteTimer}
            </p>
            <button
              className={st["return-btn"]}
              onClick={() => returnQuestion(item.id)}
            >
              Вернуть
            </button>
          </div>
        ))}
      </div>

      <div className={st.tabs}>
        {categories.map((item: string) => {
          return (
            <button
              className={clsx(st.tab, activeCategory === item && st.active)}
              onClick={() => setActiveCategory(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
      <h4>Вопросы в категории {activeCategory}</h4>
      <Btn
        textBtn={`Добавить вопрос в категорию ${activeCategory}`}
        dC={st.button}
        onClick={addQuestion}
      />

      <div className={st.cards}>
        {questions.map((item: Question) => {
          if (item.category === activeCategory) {
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
