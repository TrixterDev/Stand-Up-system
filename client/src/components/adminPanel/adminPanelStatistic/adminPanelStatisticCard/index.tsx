import React, { ReactNode } from "react";
import st from "./style.module.sass";
import Btn from "../../../ui/Btn/Btn";

interface Props {
  children: ReactNode;
}

const AdminPanelStatisticCard: React.FC<Props> = ({ children }) => {
  return (
    <div className={st.card}>
      <div className="card__header">
        <h5>Всего сотрудников</h5>
      </div>
      <div className="card__body">
        {children}
        <p>0</p>
      </div>
      <div className="card__footer">
        <Btn textBtn="Подробнее..." dC="" />
      </div>
    </div>
  );
};

export default AdminPanelStatisticCard;
