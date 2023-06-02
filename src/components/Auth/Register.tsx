import Input from "../ui/Input/Input";
import Btn from "../ui/Btn/Btn";
import styles from "./register.module.sass";
import { useState } from "react";
import { RegUser, getUserInfo, getUsers } from "../../api";
import Cookie from "js-cookie";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

interface userKeys {
  firstname: string;
  lastname: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmPass: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<userKeys>({
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [validation, setValidation] = useState({
    confirmPass: "",
    lenghtPass: "Пароль",
  });

  const [regInfo] = useState({
    token: Cookie.get("key") || null,
    isConfirmed: false,
  });

  const [isShowPassword, setIsShowPassword] = useState(false);

  const [emailEx, setEmailEx] = useState<boolean>(false);

  const [usernameEx, setUsernameEx] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user.password == user.confirmPass) {
      console.log("Пароль успешно подтвержден");
      setPasswordsMatch(true);
      RegUser(user).then((resp) => {
        Cookie.set("key", resp.jwt, { expires: 7 });
        navigate("/");
      });
    } else {
      console.log("Пароль и его подтверждение не совпадают");
      setPasswordsMatch(false);
    }

    if (user.password.length < 8) {
      setValidation((validation) => {
        return {
          ...validation,
          lenghtPass: "Пароль должен содержать 8 символов",
        };
      });
    } else {
      setValidation((validation) => {
        return {
          ...validation,
          lenghtPass: "Пароль",
        };
      });
    }

    const isEmailExists = await checkEmailExists(user.email);

    const isUsernameExists = await checkUsernameExists(user.username);

    if (isEmailExists) {
      setEmailEx(true);
      console.log("Пользователь с таким email уже существует");
    } else {
      setEmailEx(false);
      console.log("Email доступен");
    }

    if (isUsernameExists) {
      setUsernameEx(true);
      console.log("Пользователь с таким именем пользователя уже существует");
    } else {
      setUsernameEx(false);
      console.log("Имя пользователя доступно");
    }
  };

  if (regInfo.token) {
    getUserInfo(regInfo.token).then((resp) => {
      if (resp.role.type === "Authenticated") {
        regInfo.isConfirmed = true;
      }
    });
  }

  const checkEmailExists = async (userEmail: any) => {
    try {
      const data = await getUsers();
      const usersEmail = data.map((user) => user.email);
      const emailExists = usersEmail.includes(userEmail);
      console.log(usersEmail);

      console.log(emailExists);

      return emailExists;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const checkUsernameExists = async (username: any) => {
    try {
      const data = await getUsers();
      const usernames = data.map((user) => user.username);
      const usernameExists = usernames.includes(username);
      console.log(usernames);

      console.log(usernameExists);

      return usernameExists;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const showPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.register}>
      <div className={styles.registerWrap}>
        <div className={styles.titleWrap}>
          <h2 className={styles.title}>Stand Up</h2>
          <hr />
          <h3 className={styles.registerTitle}>Регистрация</h3>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.nameWrap}>
            <div className={styles.customInput}>
              <Input
                idElem="firstname"
                name="firstname"
                onChange={handleChange}
                required
              />
              <label htmlFor="firstname">Имя</label>
            </div>

            <div className={styles.customInput}>
              <Input
                idElem="lastname"
                name="lastname"
                onChange={handleChange}
                required
              />
              <label htmlFor="lastname">Фамилия</label>
            </div>
          </div>

          <div className={styles.customInput}>
            <Input
              idElem="username"
              name="username"
              onChange={handleChange}
              required
            />
            <label htmlFor="username">
              {usernameEx ? (
                <label htmlFor="username" className={styles.err}>
                  Имя пользователя занято
                </label>
              ) : (
                "Имя пользователя"
              )}
            </label>
          </div>

          <div className={styles.customInput}>
            <Input
              name="phone"
              onChange={handleChange}
              value={user.phone}
              idElem="phone"
              required
            />
            <label htmlFor="phone">Номер телефона</label>
          </div>

          <div className={styles.customInput}>
            <Input
              name="email"
              onChange={handleChange}
              value={user.email}
              idElem="email"
              required
            />
            <label htmlFor="email">
              {emailEx ? (
                <label htmlFor="email" className={styles.err}>
                  E-mail занят
                </label>
              ) : (
                "E-mail"
              )}
            </label>
          </div>

          <div className={styles.customInput}>
            <Input
              name="password"
              onChange={handleChange}
              typeElem={isShowPassword ? "text" : "password"}
              idElem="password"
              secondClass={styles.passInput}
              required
            />
            <label
              htmlFor="password"
              className={validation.lenghtPass.length > 8 && styles.err}
            >
              {validation.lenghtPass}
            </label>

            <label className={styles.eyeLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                onClick={showPassword}
              />
              <div className={styles.eye}></div>
            </label>
          </div>

          <div className={styles.confPassWrap}>
            <div className={styles.customInput}>
              <Input
                name="confirmPass"
                idElem="confPass"
                onChange={handleChange}
                typeElem={isShowPassword ? "text" : "password"}
                required
              />
              <label htmlFor="confPass">
                {passwordsMatch ? (
                  "Подтвердите пароль"
                ) : (
                  <label htmlFor="confPass" className={styles.err}>
                    Пароль не совпадает
                  </label>
                )}
              </label>
            </div>

            <Btn type="submit" textBtn={"Зарегистрироваться"} />
          </div>
        </form>

        <span className={styles.auth}>
          Если у вас есть аккаунт то <NavLink to={"/"}>авторизуйтесь</NavLink>
        </span>
      </div>
    </div>
  );
};

export default Register;
