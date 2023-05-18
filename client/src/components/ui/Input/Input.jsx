import st from "./style.module.sass";

const Input = ({ pHText, dC }) => {
  return (
    <input className={`${st.input} ${dC}`} placeholder={pHText} type="text" />
  );
};

export default Input;
