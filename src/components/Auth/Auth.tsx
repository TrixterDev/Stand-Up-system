import st from "./auth.module.sass";
import Input from "../ui/Input/Input";
import Btn from "../ui/Btn/Btn";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { getUsers, getUserInfo, loginUser, changeUserOnline } from "../../api";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import MainPage from "../MainPage";
import Cookies from "js-cookie";
import {
  FormControl,
  IconButton,
  Link,
  TextField,
  styled,
} from "@mui/material";
import { CssTextField } from "../ui";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const [adminInfo] = useState<adminInfoKeys>({
    token: Cookie.get("key"),
    isConfirmed: false,
  });
  const [id, setId] = useState<number>(0);

  const [validation, setValidation] = useState<string>();

  const [form, setForm] = useState<formKeys>({
    identifier: "",
    password: "",
  });

  const [isShowPassword, setIsShowPassword] = useState(false);

  useEffect(() => {
    if (Cookie.get("role") === "admin") {
      navigate("/admin-page/statistic");
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
        Cookie.set("idUser", resp.user.id, { expires: 7 });
        getUserInfo().then((resp) => {
          changeUserOnline({ online: true }, resp.id);
        });
        if (resp.user.admin) {
          Cookie.set("role", "admin");
          navigate("/admin-page/statistic");
        } else {
          Cookie.set("role", "auth");
          navigate("/home");
        }
      })
      .catch((error: any) => {
        if (error.response && error.response.status === 400) {
          error.response.json().then((resp: any) => {
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

  // const showPassword = () => {
  //   setIsShowPassword((prev) => !prev);
  // };

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
          <CssTextField
            required
            type="email"
            name="identifier"
            onChange={handleInput}
            fullWidth
            variant="outlined"
            label="E-mail"
          />
          <div className={st.auth__pass}>
            <CssTextField
              required
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleInput}
              fullWidth
              label="Пароль"
            />
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              className={st.auth__showPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
          <Btn textBtn="Войти" />
        </form>
        <span className={st.auth__hint}>
          Если у вас нет аккаунта то{" "}
          <Link href="/register">зарегистрируйтесь</Link>
        </span>
      </div>
    </div>
  );
};

export default Auth;
