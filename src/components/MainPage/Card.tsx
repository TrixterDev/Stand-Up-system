import st from "./MainPage.module.sass";
import React, { useEffect, useState } from "react";
import { questionItem } from ".";
import Btn from "../ui/Btn/Btn";
import { changeData, getUserInfo } from "../../api";
import { it } from "date-fns/locale";
import { Loader } from "../ui/Loader";
import { format, parseISO } from "date-fns";

interface props {
  id: number;
  productInfo: questionItem;
  category_id: number;
  userId: number;
}

interface itemKeys {
  title: string;
  answer: string;
  category_id: number;
  id: number;
  userId: number;
  createdDate: string;
}
const Card: React.FC<props> = ({ productInfo, userId, id, category_id }) => {
  const [item, setItem] = useState<itemKeys>({
    title: productInfo.title,
    answer: "",
    id: id,
    category_id: category_id,
    userId: userId,
    createdDate: "",
  });

  const [loader, setLoader] = useState<boolean>(true);

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoader(true);
    console.log(item.title);
    const currentDate = format(new Date(), "yyyy-MM-dd");
    changeData(item, userId, currentDate).then((el) => {
      setLoader(false);
      setSubmitted(true);
    });
  };

  useEffect(() => {
    getUserInfo().then((resp: any) => {
      setLoader(false);

      resp.otveties.forEach((item: any) => {
        if (id === item.question?.id) {
          setSubmitted(true);
          setItem((prev) => {
            return { ...prev, answer: item.answer };
          });
        }
      });
    });
  }, []);

  if (loader) {
    return (
      <div
        className={st.grid_item}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Loader />
      </div>
    );
  }

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
