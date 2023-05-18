import st from './style.module.sass'

const Input = ({ pHText, name, onchange, dC, idElem, typeElem, required }) => {
  return (
    <input
      name={name}
      onChange={onchange}
      className={`${st.input} ${dC}`}
      placeholder={pHText}
      id={idElem}
      type={typeElem}
      required={required && required}
    />
  );
};


export default Input
