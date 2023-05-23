import React from "react";
import st from "./style.module.sass";

interface InputProps {
  pHText?: string;
  name?: string;
  onChange?: any;
  idElem?: string;
  typeElem?: string;
  secondClass?: string;
  value?: any,
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
  value
}) => {
  return (
    <input
      name={name}
      onChange={onChange}
      className={`${st.input} ${secondClass}`}
      placeholder={pHText}
      id={idElem}
      type={typeElem}
      required={required}
      value={value}
    />
  );
};

export default Input;
