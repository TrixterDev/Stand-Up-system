import React from "react";
import st from "./style.module.sass";

interface InputProps {
  pHText?: string;
  name?: string;
  onChange?: any;
  idElem?: string;
  typeElem?: string;
  secondClass?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  pHText,
  name,
  onChange,
  idElem,
  typeElem,
  required,
  secondClass,
}) => {
  return (
    <input
      name={name}
      onChange={onChange}
      className={`${st.input}`}
      placeholder={pHText}
      id={idElem}
      type={typeElem}
      required={required}
      secondClass={secondClass}
    />
  );
};

export default Input;
