import st from "./auth.module.sass";
import Input from "../ui/Input/Input";
import Btn from "../ui/Btn/Btn";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { loginUser } from "../../api";

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
    token: Cookies.get("key"),
    isConfirmed: false,
  });

  const [form, setForm] = useState<formKeys>({
    identifier: "",
    password: "",
  });

  useEffect(() => {
    if (Cookies.get("role") === "admin") {
      navigate("/admin-page");
    } else if (Cookies.get("role") === "auth") {
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
      .then((resp: any) => {
        console.log(resp);
        Cookies.set("key", resp.jwt, { expires: 7 });
        if (resp.user.admin) {
          Cookies.set("role", "admin");
          navigate("/admin-page");
        } else {
          Cookies.set("role", "auth");
          navigate("/home");
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  return (
    <div className={st.auth__wrap}>
      <div>
        <form onSubmit={handleSubmit}>
          <div className={st.auth__content}>
            <div className={st.auth__title}>
              <h2>Stand Up</h2>
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
