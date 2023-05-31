import st from "./MainPage.module.sass";
import React, { useState } from "react";
import { questionItem } from ".";
import Btn from "../ui/Btn/Btn";
import { changeData } from "../../api";
interface props {
  id: number;
  productInfo: questionItem;
  category_id: number;
}

interface itemKeys {
  title: string;
  answer: string;
  category_id: number;
  id: number;
}
const Card: React.FC<props> = ({ productInfo, id, category_id }) => {
  const [item, setItem] = useState<itemKeys>({
    title: productInfo.title,
    answer: "",
    id: id,
    category_id: category_id,
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(item.title);
    changeData(item, item.id);
    setSubmitted(true);
  };

  return (
    <div key={item?.id} className={st.grid_item}>
      {item.title}
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
