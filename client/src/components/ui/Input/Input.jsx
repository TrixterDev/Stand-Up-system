import st from './style.module.sass'

const Input = ({ pHText, name, onchange, dC, idElem, typeElem, required }) => {
  return (
    <input
      className={`${st.input} ${dC}`}
      placeholder={pHText}
      id={idElem}
      name={name}
      type={typeElem}
      onChange={onchange}
      required={required && required}
    />
  );
};


export default Input
