import st from './style.module.sass'

const Input = ({ pHText, dC, idElem, typeElem, required }) => {
    return (
        <input
            className={`${st.input} ${dC}`}
            placeholder={pHText}
            id={idElem}
            type={typeElem}
            required={required && required}
        />
    )
}

export default Input
