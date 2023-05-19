import { useState } from "react";
import st from "./style.module.sass";
import Btn from "../../ui/Btn/Btn";
import Input from "../../ui/Input/Input";

interface questionEditKeys {
  answer: string;
  question: string;
}

const PanelQuestion = () => {
  const [questions, setQuiestions] = useState([
    { title: "Как тебя зовут?" },
    { title: "Как тебя зовут?" },
    { title: "Как тебя зовут?" },
  ]);

  const [questionEdit, setQuestionEdit] = useState<questionEditKeys | null>(
    null
  );
  return (
    <section className={st.container}>
      <div className={st.cards}>
        <article className={st.card}>
          <Input pHText="Введите вопрос" secondClass={st.input} />
          <Input pHText="Введите ответ" secondClass={st.input} />
        </article>
        {questions.map((item) => {
          return (
            <article className={st.card}>
              <h2>{item.title}</h2>
            </article>
          );
        })}
      </div>
      <Btn textBtn="Добавить вопрос" dC={st.button} />
    </section>
  );
};

export default PanelQuestion;
