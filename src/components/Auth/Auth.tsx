import st from "./auth.module.sass";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { loginUser, changeUserOnline } from "../../api";
import { enqueueSnackbar } from "notistack";
import Cookie from "js-cookie";

import { getUserInfo } from "../../api";

import { Button, IconButton, Link } from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CssTextField } from "../ui";

interface FormKeys {
  identifier: string;
  password: string;
}

const Auth = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [form, setForm] = useState<FormKeys>({
    identifier: "",
    password: "",
  });

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    const role = Cookie.get("role");
    if (role === "admin") {
      navigate("/admin-page/statistic");
    } else if (role === "auth") {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, []);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loginUser(form)
      .then((resp: { jwt: string; user: any }) => {
        const { jwt, user } = resp;
        Cookie.set("key", jwt, { expires: 7 });
        Cookie.set("idUser", user.id, { expires: 7 });

        getUserInfo().then((resp) => {
          changeUserOnline({ online: true }, resp.id);
        });

        const role = user.admin ? "admin" : "auth";
        Cookie.set("role", role);
        navigate(role === "admin" ? "/admin-page/statistic" : "/home");
      })
      .catch((error: any) => {
        let errorMessage = "Что-то не пашет";
        if (error.response) {
          if (error.response.status === 400) {
            errorMessage = "Неверный e-mail или пароль";
          } else if (error.response.status === 500) {
            errorMessage = "Сервер недоступен";
          }
        }
        enqueueSnackbar(errorMessage, {
          variant: "error",
          className: "snackBar",
        });
        console.error(error);
      });
  };

  return (
    <div className={st.auth__wrap}>
      <div className={st.auth__content}>
        <div className={st.auth__title}>
          <h3>Stand Up</h3>
          <hr />
          <h4>Авторизация</h4>
        </div>
        <form className={st.auth__form} onSubmit={handleSubmit}>
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
          <Button type="submit" variant="contained">
            Войти
          </Button>
        </form>
        <span className={st.auth__hint}>
          Если у вас нет аккаунта, то{" "}
          <Link href="/register">зарегистрируйтесь</Link>
        </span>
      </div>
    </div>
  );
};

export default Auth;
