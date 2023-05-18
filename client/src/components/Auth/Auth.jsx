import st from "./auth.module.sass";
import Input from "../../components/ui/Input/Input";
import Btn from "../ui/Btn/Btn";

const Auth = () => {
  return (
    <div className={st.auth__wrap}>
      <div>
        <div className={st.auth__content}>
          <div className={st.auth__title}>
            <h1>Stand Up</h1>
            <hr />
            <p>Авторизация</p>
          </div>
          <div className={`${st.customInput} ${st.auth__input}`}>
            <Input idElem="email" />
            <label htmlFor="email">E-mail</label>
          </div>
          <div className={st.auth__btn}>
            <div className={st.customInput}>
              <Input idElem="pass" typeElem="password" />
              <label htmlFor="pass">Пароль</label>
            </div>
            <Btn textBtn="Войти" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
