import st from "./style.module.sass";

const Input = ({ name, onChange, pHText, dC, idElem, typeElem }) => {
  return (
    <input
      name={name}
      onChange={onChange}
      className={`${st.input} ${dC}`}
      placeholder={pHText}
      id={idElem}
      type={typeElem}
    />
  );
};

export default Input;
