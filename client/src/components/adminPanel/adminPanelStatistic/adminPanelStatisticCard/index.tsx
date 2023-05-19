import React, { ReactNode } from "react";
import st from "./style.module.sass"
import Btn from "../../../ui/Btn/Btn";

interface Props {
  children: ReactNode;
  title: string;
}

const AdminPanelStatisticCard: React.FC<Props> = ({ title, children }) => {
  return (
    <div className={st.card}>
      <div className={st.card__header}>
        <h5>{title}</h5>
      </div>
      <div className={st.card__body}>
        {children}
        <p>0</p>
      </div>
      <div className={st.card__footer}>
        <Btn textBtn="Подробнее..." dC={st.card__footer__btn} />
      </div>
    </div>
  );
};

export default AdminPanelStatisticCard;