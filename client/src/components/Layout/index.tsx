import React from "react";
import st from "./style.module.sass";
import { Link, NavLink } from "react-router-dom";
import { ImStatsBars } from "react-icons/im";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
interface props {
  children: any;
}
const Layout: React.FC<props> = ({ children }) => {
  return (
    <div className={st.wrap}>
      <div>
        <nav className={st.nav}>
          <div className={st.nav__link}>
            <img src="../../../public/img/logo.svg" alt="" />
            <NavLink
              to="/statistic"
              className={({ isActive }) => (isActive ? st.isActive : "")}
            >
              <ImStatsBars />
              <span>Статистика</span>
            </NavLink>
            <NavLink
              to="/answer"
              className={({ isActive }) => (isActive ? st.isActive : "")}
            >
              <RiQuestionAnswerFill />
              <span>Ответы</span>
            </NavLink>
            <NavLink
              to="/question"
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
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
