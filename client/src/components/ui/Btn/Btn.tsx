import React from "react";
import st from "./style.module.sass";

interface BtnProps {
  textBtn: string;
  dC?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

const Btn: React.FC<BtnProps> = ({ textBtn, dC, type, onClick }) => {
  return (
    <button className={`${st.btn} ${dC}`} onClick={onClick} type={type}>
      {textBtn}
    </button>
  );
};

export default Btn;
