import st from "./style.module.sass";

const Btn = ({ textBtn, dC }) => {
  return <button className={`${st.btn} ${dC}`}>{textBtn}</button>;
};

export default Btn;
