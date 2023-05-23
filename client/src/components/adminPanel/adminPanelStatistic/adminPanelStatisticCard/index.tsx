import React, { ReactNode } from "react";
import st from "./style.module.sass";
import Btn from "../../../ui/Btn/Btn";
import { useNavigate } from "react-router";

interface Props {
  children: ReactNode;
  title: string;
  count: number;
  click: () => void;
  path?: string;
}

const AdminPanelStatisticCard: React.FC<Props> = ({
  count,
  title,
  children,
  click,
}) => {
  return (
    <div className={st.card}>
      <div className={st.card__header}>
        <h5>{title}</h5>
      </div>
      <div className={st.card__body}>
        {children}
        <p>{count}</p>
      </div>
      <div className={st.card__footer}>
        <Btn textBtn="Подробнее..." dC={st.card__footer__btn} onClick={click} />
      </div>
    </div>
  );
};

export default AdminPanelStatisticCard;
