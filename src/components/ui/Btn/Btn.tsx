import React from "react";
import st from "./style.module.sass";

interface BtnProps {
  textBtn?: string;
  dC?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  icon?: any;
}

const Btn: React.FC<BtnProps> = ({ textBtn, dC, type, onClick, icon }) => {
  return (
    <button className={`${st.btn} ${dC}`} type={type} onClick={onClick}>
      {textBtn}
      {icon}
    </button>
  );
};

export default Btn;
