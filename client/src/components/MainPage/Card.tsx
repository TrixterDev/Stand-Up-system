import { changeData } from "../../api";
import st from "./MainPage.module.sass";
import React, { useState } from "react";
import { questionItem } from ".";
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
  console.log(item);

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
          <div>
            <input
              type="text"
              name="answer"
              value={item.answer}
              onChange={(e) => setItem({ ...item, answer: e.target.value })}
            />
            <button>submit</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Card;
