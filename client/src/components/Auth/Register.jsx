import Input from "../ui/Input/Input";
import Btn from "../ui/Btn/Btn";

import styles from "./Register.module.css";
import { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    login: "",
    phone: 0,
    pass: "",
    confirmPass: "",
  });
  const handleChange = (event) => {
    setUser((prevUser) => ({ ...prevUser, [event.target.name]: event.target.value }));
  };
  const handleSubmit = (event) => {
    setUser(event.target.value);
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
          <Input onChange={handleChange} name="login" value={user.login} pHText={"Login"} />
          <Input onChange={handleChange} name="phone" value={user.phone} pHText={"Phone"} />
          <Input
            onChange={handleChange}
            name="pass"
            typeElem={"password"}
            pHText={"Passoword"}
          />

          <div className={styles.confPassWrap}>
            <Input  onChange={handleChange} name="confirmPass" typeElem={"password"} pHText={"Confirm Password"} />
            <Btn type="submit" textBtn={"Autificated"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
