import Input from "../ui/Input/Input";
import Btn from "../ui/Btn/Btn";

import styles from "./Register.module.css";
import { useState } from "react";
import { RegUser, getUserInfo } from "../../api";
import Cookie from "js-cookie";
import { useNavigate } from "react-router";

interface userKeys {
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmPass: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<userKeys>({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const handleChange = (event: any) => {
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    RegUser(user).then((resp) => {
      Cookie.set("key", resp.jwt);
      navigate("/");
    });
    if (user.password === user.confirmPass) {
      console.log("Пароль успешно подтвержден");
    } else {
      console.log("Пароль и его подтверждение не совпадают");
    }
    setUser((prevUser) => ({ ...prevUser, pass: "", confirmPass: "" }));
  };

  return (
    <div className={styles.register}>
      <div className={styles.registerWrap}>
        <div className={styles.titleWrap}>
          <h2 className={styles.title}>Stand Up</h2>
          <hr />
          <h3 className={styles.registerTitle}>Registration</h3>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            onChange={handleChange}
            name="username"
            pHText={"Login"}
            required
          />
          <Input
            onChange={handleChange}
            name="phone"
            pHText={"Phone"}
            required
          />

          <Input onChange={handleChange} name="email" pHText={"E-mail"} />

          <Input
            onChange={handleChange}
            name="password"
            typeElem={"password"}
            pHText={"Passoword"}
            required
          />

          <div className={styles.confPassWrap}>
            <Input
              name="confirmPass"
              pHText={"Confirm Password"}
              onChange={handleChange}
              typeElem={"password"}
              required
            />
            <Btn type="submit" textBtn={"Autificated"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
