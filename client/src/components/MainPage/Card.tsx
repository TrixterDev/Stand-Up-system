import { changeData } from "../../api";
import st from "./MainPage.module.sass";
import React, { useState } from "react";

interface props {
  productInfo: { answer: string; question: string };
  data: any;
  index: number;
  id: number;
}

interface itemKeys {
  answer: string;
  question: string;
  id: number;
}
const Card: React.FC<props> = ({ productInfo, data, index, id }) => {
  const [item, setItem] = useState<itemKeys>({
    answer: productInfo?.answer,
    question: productInfo?.question,
    id,
  });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(index);

    let product = [...data];
    product.splice(index, 1, item);
    changeData(product);
    setSubmitted(true);
  };

  return (
    <div key={item?.id} className={st.grid_item}>
      {item?.question}
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
