import Input from "../ui/Input/Input";
import Btn from "../ui/Btn/Btn";

import styles from "./Register.module.css";

const Register = () => {
  return (
    <div className={styles.register}>
      <div className={styles.registerWrap}>
        <div className={styles.titleWrap}>
          <h2 className={styles.title}>Stand Up</h2>
          <hr />
          <h3 className={styles.registerTitle}>Registration</h3>
        </div>

        <form className={styles.form}>
          {/* <input type="text" placeholder="Login" className={styles.login} />
          <input type="text" placeholder="Phone" className={styles.phone} />
          <input
            type="password"
            placeholder="Password"
            className={styles.password}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.ConfirmPassword}
          /> */}

          <Input></Input>
          <Input></Input>
          <Input></Input>
          <div className={styles.confPassWrap}>
            <Input></Input>
          </div>
        </form>
        <Btn></Btn>
      </div>
    </div>
  );
};

export default Register;
