import Input from "../ui/Input/Input";
import Btn from "../ui/Btn/Btn";
import styles from "./Register.module.sass";
import { useState } from "react";
import { RegUser } from "../../api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

interface userKeys {
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmPass: string;
  lastname: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<userKeys>({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPass: "",
    lastname: "",
  });

  const handleChange = (event: any) => {
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    RegUser(user).then((resp: any) => {
      Cookies.set("key", resp.jwt, { expires: 7 });
      navigate("/");
    });
    if (user.password === user.confirmPass) {
      console.log("Пароль успешно подтвержден");
    } else {
      console.log("Пароль и его подтверждение не совпадают");
    }
    setUser((prevUser) => ({ ...prevUser, pass: "", confirmPass: "" }));
  };
    setUser((prevUser) => ({ ...prevUser, pass: "", confirmPass: "" }));
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
          <div className={styles.nameUser}>
            <div className={styles.customInput}>
              <Input
                onChange={handleChange}
                name="username"
                idElem="username"
                typeElem="text"
                required
              />
              <label htmlFor="username">Имя</label>
            </div>
            <div className={styles.customInput}>
              <Input
                onChange={handleChange}
                name="lastname"
                idElem="lastname"
                typeElem="text"
                required
              />
              <label htmlFor="lastname">Фамилия</label>
            </div>
          </div>
          <div className={styles.customInput}>
            <Input
              onChange={handleChange}
              name="phone"
              idElem="phone"
              typeElem="number"
              required
            />
            <label htmlFor="phone">Телефон</label>
          </div>

          <div className={styles.customInput}>
            <Input
              onChange={handleChange}
              name="email"
              idElem="email"
              typeElem="email"
              required
            />
            <label htmlFor="email">E-mail</label>
          </div>

          <div className={styles.customInput}>
            <Input
              onChange={handleChange}
              name="password"
              idElem="password"
              typeElem="password"
              required
            />
            <label htmlFor="password">Пароль</label>
          </div>

          <div className={styles.confPassWrap}>
            <div className={styles.customInput}>
              <Input
                onChange={handleChange}
                name="confirmPass"
                idElem="confirmPass"
                typeElem="password"
                required
              />
              <label htmlFor="confirmPass">Подтвердите пароль</label>
            </div>
            <Btn type="submit" textBtn={"Зарегистрироваться"} />
          </div>
          <span className={styles.span}>
            Если у вас нет аккаунта то <NavLink to={"/"}>авторазуйтесь</NavLink>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
export default Register;
