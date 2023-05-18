import st from "./style.module.sass";

const Input = ({ pHText, dC, idElem, typeElem }) => {
  return (
    <input
      className={`${st.input} ${dC}`}
      placeholder={pHText}
      id={idElem}
      type={typeElem}
    />
  );
};

export default Input;
