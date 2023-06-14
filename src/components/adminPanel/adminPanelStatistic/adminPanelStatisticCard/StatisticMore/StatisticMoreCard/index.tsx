import React, { ReactNode } from "react";
import st from "./style.module.sass";
import cn from "clsx";
interface Props {
  username: string | undefined;
  status: string;
  avatarka: string | undefined;
  answer: any;
}
const StatisticMoreCard: React.FC<Props> = ({
  username,
  status,
  avatarka,
  answer,
}) => {
  return (
    <div className={st.StatisticMoreCard}>
      <div className={st.StatisticMoreCard__card}>
        <img src={avatarka} alt={avatarka} />
        <h4>Пользователь: {username}</h4>
        <h4>Общее количество ответов: {answer.length}</h4>
        <h4>
          Статус:
          <span className={cn(st.disabled, status && st.active)}>
            {status ? " Онлайн" : " Офлайн"}
          </span>
        </h4>
      </div>
    </div>
  );
};

export default StatisticMoreCard;
