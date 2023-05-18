import st from "./style.module.sass";

const Input = ({ pHText, name, onchange, dC, idElem, typeElem }) => {

  return (
    <input
      name={name}
      onChange={onchange}
      className={`${st.input} ${dC}`}
      placeholder={pHText}
      id={idElem}
      name={name}
      type={typeElem}
      onChange={onChange}
    />
  );
};

export default Input;
