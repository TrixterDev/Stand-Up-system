import st from "./auth.module.sass";
import Input from "../ui/Input/Input";
import Btn from "../ui/Btn/Btn";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { getUsers, getUserInfo, loginUser } from "../../api";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

interface adminInfoKeys {
  token: string | any;
  isConfirmed: boolean;
}

interface formKeys {
  identifier: string;
  password: string;
}

const Auth = () => {
  const navigate = useNavigate();
  const [adminInfo] = useState<adminInfoKeys>({
    token: Cookie.get("key"),
    isConfirmed: false,
  });

  const [validation, setValidation] = useState<string>();

  const [form, setForm] = useState<formKeys>({
    identifier: "",
    password: "",
  });

  const [isShowPassword, setIsShowPassword] = useState(false);

  useEffect(() => {
    if (Cookie.get("role") === "admin") {
      navigate("/admin-page");
    } else if (Cookie.get("role") === "auth") {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, []);

  const handleInput = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    loginUser(form)
      .then((resp: { jwt: string; user: any }) => {
        console.log(resp);
        Cookie.set("key", resp.jwt, { expires: 7 });
        if (resp.user.admin) {
          Cookie.set("role", "admin");
          navigate("/admin-page");
        } else {
          Cookie.set("role", "auth");
          navigate("/home");
        }
      })
      .catch((error: any) => {
        if (error.response && error.response.status === 400) {
          error.response.json().then((resp) => {
            setValidation("Неверный e-mail или пароль");
          });
        } else if (error.response && error.response.status === 500) {
          setValidation("Сервер недоступен");
          console.log(error.response.status);
        } else {
          console.log(error.response);
          setValidation("Что то не пашет");
        }
        console.error(error);
      });
  };

  const showPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div className={st.auth__wrap}>
      <div className={st.auth__content}>
        <div className={st.auth__title}>
          <h2 className={st.title}>Stand Up</h2>
          <hr />
          <h3 className={st.authTitle}>Авторизация</h3>
          <p className={st.err}>{validation}</p>
        </div>
        <form className={st.form} onSubmit={handleSubmit}>
          <div className={`${st.customInput} ${st.auth__input}`}>
            <Input
              name="identifier"
              idElem="email"
              onChange={handleInput}
              required
            />
            <label htmlFor="email">E-mail</label>
          </div>

          <div className={st.auth__btn}>
            <div className={st.customInput}>
              <Input
                onChange={handleInput}
                name="password"
                idElem="password"
                secondClass={st.passInput}
                typeElem={isShowPassword ? "text" : "password"}
                required
              />
              <label htmlFor="password">Пароль</label>
              <label className={st.eyeLabel}>
                <input
                  type="checkbox"
                  className={st.checkbox}
                  onClick={showPassword}
                />
                <div className={st.eye}></div>
              </label>
            </div>
            <Btn textBtn="Войти" />
          </div>
        </form>
        <span className={st.span}>
          Если у вас нет аккаунта то{" "}
          <NavLink to={"/register"}>зарегистрируйтесь</NavLink>
        </span>
      </div>
    </div>
  );
};

export default Auth;
