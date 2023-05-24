import React from "react";
import st from "./style.module.sass";
import { Link, NavLink } from "react-router-dom";
import { ImStatsBars } from "react-icons/im";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { BsFillClipboard2Fill, BsFillQuestionCircleFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
interface props {
  children: any;
}
const Layout: React.FC<props> = ({ children }) => {
  return (
    <div className={st.wrap}>
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
            to="/admin-page/draft"
            className={({ isActive }) => (isActive ? st.isActive : "")}
          >
            <BsFillClipboard2Fill />
            <span>Черновик</span>
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
          to="/question"
          className={({ isActive }) => (isActive ? st.isActive : "")}
        >
          <ImExit />
          <span>Выйти</span>
        </NavLink>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
