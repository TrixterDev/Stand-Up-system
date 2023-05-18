import Input from "../ui/Input/Input";
import Btn from "../ui/Btn/Btn";

import styles from "./Register.module.css";
import { useState } from "react";
import { RegUser, getUserInfo } from "../../api";
import Cookie from "js-cookie";
import { useNavigate } from "react-router";
const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    phone: null,
    email: "",
    password: "",
    confirmPass: "",
  });
  const [regInfo] = useState({
    token: Cookie.get("key") || null,
    isConfirmed: false,
  });

  const handleChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    RegUser(user).then((resp) => {
      Cookie.set("key", resp.jwt);
      navigate("/");
    });
    if (user.pass === user.confirmPass) {
      console.log("Пароль успешно подтвержден");
    } else {
      console.log("Пароль и его подтверждение не совпадают");
    }
    setUser((prevUser) => ({ ...prevUser, pass: "", confirmPass: "" }));
  };

  if (regInfo.token) {
    getUserInfo(regInfo.token).then((resp) => {
      if (resp.role.type === "Authenticated") {
        regInfo.isConfirmed = true;
      }
    });
  }

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
            onchange={handleChange}
            name="username"
            value={user.username}
            pHText={"Login"}
            required
          />
          <Input
            onchange={handleChange}
            name="phone"
            value={user.phone}
            pHText={"Phone"}
            required
          />

          <Input
            onchange={handleChange}
            name="email"
            value={user.email}
            pHText={"E-mail"}
          />

          <Input
            onchange={handleChange}
            name="password"
            typeElem={"password"}
            pHText={"Passoword"}
            required
          />

          <div className={styles.confPassWrap}>
            <Input
              onchange={handleChange}
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
