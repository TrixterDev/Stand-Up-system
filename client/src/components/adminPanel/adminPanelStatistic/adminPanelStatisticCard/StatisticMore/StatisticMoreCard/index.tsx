import React, { ReactNode } from "react";
import st from "./style.module.sass";
import cn from "clsx";
interface Props {
  username: string;
  status: string;
}
const StatisticMoreCard: React.FC<Props> = ({ username, status }) => {
  return (
    <div className={st.StatisticMoreCard}>
      <div className={st.StatisticMoreCard__card}>
        <img src="/img/base-avatar.png" alt="baseAvatar" />
        <h4>Пользователь: {username}</h4>
        <h4>
          Статус:
          <span className={cn(st.disabled, status && st.active)}>
            {status ? "Онлайн" : "Офлайн"}
          </span>
        </h4>
      </div>
    </div>
  );
};

export default StatisticMoreCard;
