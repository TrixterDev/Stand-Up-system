import { Button } from "@mui/material";
import React, { FormEventHandler, useState, useEffect } from "react";
import styles from "./auth.module.sass";
import Cookie from "js-cookie";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { RegUser } from "../../api";
import { useTranslation } from "react-i18next";

export interface registerData {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

export const RegisterPage = () => {
  const [userData, setUserData] = useState<registerData>({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const { t, i18n } = useTranslation("common");

  useEffect(() => {
    if (Cookie.get("key")) {
      navigate("/home");
    }
  }, []);
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submit = (e: React.FormEvent<FormEventHandler>) => {
    e.preventDefault();
    setLoading(true);
    RegUser(userData)
      .then((resp) => {
        Cookie.set("key", resp.jwt);
        navigate("/home");
      })
      .catch((err) => {
        const errorMessage = err.response.data.error.message;

        switch (errorMessage) {
          case "Email or Username are already taken":
            enqueueSnackbar("Имя пользователя или емейл уже используются", {
              variant: "error",
              autoHideDuration: 2000,
            });
            break;

          case "email must be a valid email":
            enqueueSnackbar("Введите правильный емейл", {
              variant: "error",
              autoHideDuration: 2000,
            });
            break;
          case "password must be at least 6 characters":
            enqueueSnackbar("Пароль должен содержать минимум 6 символов", {
              variant: "error",
              autoHideDuration: 2000,
            });
            break;

          default:
            break;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      className={styles.form_wrapper}
      style={{ flexDirection: "row-reverse" }}
    >
      <div className={styles.form_field_wrap}>
        <form className={styles.form} onSubmit={submit}>
          <p className={styles.form_title}>
            {t("register_title")} <strong>IWEX StandUp</strong>
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <div className={styles.form_field}>
              <input
                type="text"
                id="username"
                required
                name="firstname"
                onChange={change}
              />
              <label htmlFor="username" className={styles.form_field_label}>
                {t("firstname")}
              </label>
            </div>
            <div className={styles.form_field}>
              <input
                type="text"
                id="username"
                required
                name="lastname"
                onChange={change}
              />
              <label htmlFor="username" className={styles.form_field_label}>
                {t("lastname")}
              </label>
            </div>
          </div>
          <div className={styles.form_field}>
            <input
              type="text"
              id="username"
              required
              name="email"
              onChange={change}
            />
            <label htmlFor="username" className={styles.form_field_label}>
              Email
            </label>
          </div>
          <div className={styles.form_field}>
            <input
              type="text"
              id="username"
              required
              name="username"
              onChange={change}
            />
            <label htmlFor="username" className={styles.form_field_label}>
              {t("username")}
            </label>
          </div>
          <div className={styles.form_field}>
            <input
              type="password"
              id="username"
              required
              name="password"
              onChange={change}
            />
            <label htmlFor="username" className={styles.form_field_label}>
              {t("password")}
            </label>
          </div>
          <Button
            variant="contained"
            disabled={loading}
            type="submit"
            className="auth_btn"
          >
            {t("register_submit_btn")}
          </Button>

          <p>
            {t("already_has_account")}
            <Link to="/" className="link">
              {t("already_has_account_link")}
            </Link>
          </p>
        </form>
      </div>
      <div className={styles.form_bg}></div>
    </div>
  );
};
