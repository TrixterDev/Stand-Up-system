import React from "react";
import st from "./style.module.sass";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ImStatsBars } from "react-icons/im";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { BsFillClipboard2Fill, BsFillQuestionCircleFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import Cookies from "js-cookie";
interface props {
  children: React.ReactNode;
}

const Layout: React.FC<props> = ({ children }) => {
  const exit = () => {
    Cookies.remove("role");
    Cookies.remove("key");
  };

  return (
    <div className={st.wrap}>
      <div className={st.wrap__content}>
        <nav className={st.nav}>
          <div className={st.nav__link}>
            <img src="../../../public/img/logo.svg" alt="" />
            <NavLink
              to="/admin-page/statistic"
              className={({ isActive }) => (isActive ? st.isActive : "")}
            >
              <ImStatsBars />
              <span>Статистика</span>
            </NavLink>
            <NavLink
              to="/admin-page/answer"
              className={({ isActive }) => (isActive ? st.isActive : "")}
            >
              <RiQuestionAnswerFill />
              <span>Ответы</span>
            </NavLink>
            <NavLink
              to="/admin-page/archive"
              className={({ isActive }) => (isActive ? st.isActive : "")}
            >
              <BsFillClipboard2Fill />
              <span>Архив</span>
            </NavLink>
            <NavLink
              to="/admin-page/question"
              className={({ isActive }) => (isActive ? st.isActive : "")}
            >
              <BsFillQuestionCircleFill />
              <span>Вопросы</span>
            </NavLink>
          </div>
          <NavLink
            to="/"
            onClick={exit}
            className={({ isActive }) => (isActive ? st.isActive : "")}
          >
            <ImExit />
            <span>Выйти</span>
          </NavLink>
        </nav>
      </div>
      <div className={st.content}>{children}</div>
    </div>
  );
};

export default Layout;
