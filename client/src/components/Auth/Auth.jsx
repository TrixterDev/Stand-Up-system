import st from "./auth.module.sass";
import Input from "../../components/ui/Input/Input";
import Btn from "../ui/Btn/Btn";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { getUserInfo, loginUser } from "../../api";
import { useNavigate } from "react-router";
const Auth = () => {
  const navigate = useNavigate();
  const [adminInfo] = useState({
    token: Cookie.get("key"),
    isConfirmed: false,
  });

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  useEffect(() => {
    if (adminInfo.token) {
      navigate("/");
    }
  }, []);

  if (adminInfo.token) {
    getUserInfo(adminInfo.token).then((resp) => {
      if (resp.role.type === "admin") {
        adminInfo.isConfirmed = true;
      }
    });
  }

  const handleInput = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(form)
      .then((resp) => {
        Cookie.set("key", resp.jwt);
        console.log(resp);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={st.auth__wrap}>
      <div>
        <form onSubmit={handleSubmit}>
          <div className={st.auth__content}>
            <div className={st.auth__title}>
              <h1>Stand Up</h1>
              <hr />
              <p>Авторизация</p>
            </div>
            <div className={`${st.customInput} ${st.auth__input}`}>
              <Input
                value={form.identifier}
                name="identifier"
                idElem="email"
                onchange={handleInput}
              />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className={st.auth__btn}>
              <div className={st.customInput}>
                <Input
                  onchange={handleInput}
                  value={form.password}
                  name="password"
                  idElem="password"
                  typeElem="password"
                />
                <label htmlFor="pass">Пароль</label>
              </div>
              <Btn textBtn="Войти" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
