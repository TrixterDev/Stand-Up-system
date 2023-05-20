import { useState } from "react";
import st from "./style.module.sass";
import Btn from "../../ui/Btn/Btn";
import Input from "../../ui/Input/Input";

interface Question {
  title: string;
  edit?: boolean;
}

const PanelQuestion = () => {
  const [questions, setQuestions] = useState<Question[]>([
    { title: "Как тебя зовут?" },
    { title: "Как тебя зовут?", edit: true },
    { title: "Сколько тебе лет?" },
  ]);

  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { title: "", edit: true },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(() => {
      const data = [...questions];
      data.splice(index, 1);
      return data;
    });
  };

  return (
    <section className={st.container}>
      <div className={st.cards}>
        {questions.map((item, index) => (
          <article className={st.card} key={index}>
            {item.edit ? (
              <>
                <Input pHText="Введите вопрос" secondClass={st.input} />
                <Btn textBtn="Добавить вопрос" dC={st["add-btn"]} />
                <Btn
                  textBtn="Отменить"
                  dC={st["cancel-btn"]}
                  onClick={() => removeQuestion(index)}
                />
              </>
            ) : (
              <h2>{item.title}</h2>
            )}
          </article>
        ))}
      </div>
      <Btn textBtn="Добавить вопрос" dC={st.button} onClick={addQuestion} />
    </section>
  );
};

export default PanelQuestion;
