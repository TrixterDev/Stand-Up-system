import { Button } from "@mui/material";
import React, { FormEventHandler, useState, useEffect } from "react";
import styles from "./auth.module.sass";

import Cookie from "js-cookie";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getUserInfo, loginUser } from "../../api";
import { useTranslation } from "react-i18next";
import axios from "axios";

export const Login = () => {
  const [userData, setUserData] = useState<loginData>({
    identifier: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const { t, i18n } = useTranslation("common");

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    if (Cookie.get("key")) {
      navigate("/home");
    }
  }, []);

  const submit = (e: React.FormEvent<FormEventHandler>) => {
    e.preventDefault();
    setLoading(true);
    loginUser(userData)
      .then(async (resp) => {
        Cookie.set("key", resp.jwt);
        await axios
          .get("http://localhost:1337/api/users/me?populate=role", {
            headers: {
              Authorization: `Bearer ${resp.jwt}`,
            },
          })
          .then((resp) => {
            let userRole = resp.data.role.name;

            Cookie.set("role", userRole);
            if (userRole === "Admin") {
              navigate("/admin-page/statistic");
            } else {
              navigate("/home");
            }
            enqueueSnackbar("Successful login", {
              variant: "success",
              autoHideDuration: 3000,
            });
          });
      })
      .catch((err) => {
        const errorMessage = err.response.data.error.message;
        switch (errorMessage) {
          case "Invalid identifier or password":
            enqueueSnackbar("Неверный логин или пароль", {
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
    <div className={styles.form_wrapper}>
      <div className={styles.form_field_wrap}>
        <form className={styles.form} onSubmit={submit}>
          <p className={styles.form_title}>
            {t("login_title")} <strong>IWEX StandUp</strong>
          </p>
          <div className={styles.form_field}>
            <input
              type="text"
              id="username"
              required
              name="identifier"
              onChange={change}
            />
            <label htmlFor="username" className={styles.form_field_label}>
              {t("login")}
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
            {t("login_submit_btn")}
          </Button>

          <p>
            {t("dont_have_an_account")}
            <Link to="/register" className="link">
              {t("dont_have_an_account_link")}
            </Link>
          </p>
        </form>
      </div>
      <div className={styles.form_bg}></div>
    </div>
  );
};
