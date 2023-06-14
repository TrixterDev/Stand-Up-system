import React from "react";
import st from "./style.module.sass";

interface props {
  title: string;
}

export const DraftCard: React.FC<props> = ({ title }) => {
  return <div className={st.card}>{title}</div>;
};
