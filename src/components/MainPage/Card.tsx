import st from "./MainPage.module.sass";
import React, { useState } from "react";
import { questionItem } from ".";
import Btn from "../ui/Btn/Btn";
import { changeData } from "../../api";
interface props {
  id: number;
  productInfo: questionItem;
}

interface itemKeys {
  answer: string;
  question: string;
  id: number;
}
const Card: React.FC<props> = ({ productInfo, id }) => {
  const [item, setItem] = useState<itemKeys>({
    answer: productInfo.answer,
    question: productInfo.question,
    id: id,
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(item.answer);
    changeData(item.answer, id);
    setSubmitted(true);
  };

  return (
    <div key={item?.id} className={st.grid_item}>
      {item.question}
      <form onSubmit={handleSubmit}>
        {submitted ? (
          <div>
            <p>Ответь отправлен. Спасибо! </p>
            <p>Вот ответ: {item.answer}</p>
          </div>
        ) : (
          <div className={st.input_And_btn}>
            <input
              className={st.input_style}
              type="text"
              name="answer"
              value={item.answer}
              onChange={(e) => setItem({ ...item, answer: e.target.value })}
            />
            <Btn textBtn="submit" />
          </div>
        )}
      </form>
    </div>
  );
};

export default Card;
