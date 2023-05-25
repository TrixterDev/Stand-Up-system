import st from "./auth.module.sass";
import Input from "../ui/Input/Input";
import Btn from "../ui/Btn/Btn";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { getUserInfo, loginUser } from "../../api";
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

  const [form, setForm] = useState<formKeys>({
    identifier: "",
    password: "",
  });

  useEffect(() => {
    if (Cookie.get("key")) {
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
      .then((resp: any) => {
        Cookie.set("key", resp.jwt);
        console.log(resp);
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={st.auth__wrap}>
      <div>
        <form onSubmit={handleSubmit}>
          <div className={st.auth__content}>
            <div className={st.auth__title}>
              <h1>Stand Up</h1>
              <hr />
              <p>Авторизация</p>
            </div>
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
                  typeElem="password"
                  required
                />
                <label htmlFor="password">Пароль</label>
              </div>
              <Btn textBtn="Войти" />
            </div>
            <span className={st.span}>
              Если у вас нет аккаунта то{" "}
              <NavLink to={"/register"}>зарегестрируйтесь</NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
