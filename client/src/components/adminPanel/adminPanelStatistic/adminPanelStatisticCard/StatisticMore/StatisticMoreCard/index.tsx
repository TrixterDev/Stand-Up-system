import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
  username: string;
  status: string;
}
const StatisticMoreCard: React.FC<Props> = ({ children, username, status }) => {
  return (
    <div>
      <h4>Пользователь: {username}</h4>
      {children}
      <h4>Статус: {status ? "Онлайн" : "Офлайн"}</h4>
    </div>
  );
};

export default StatisticMoreCard;
