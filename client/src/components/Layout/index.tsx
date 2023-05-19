import React from "react";
import st from "./style.module.sass";
import { Link } from "react-router-dom";
import { ImStatsBars } from "react-icons/im";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { BsFillQuestionCircleFill } from "react-icons/bs";
interface props {
  children: any;
}
const Layout: React.FC<props> = ({ children }) => {
  return (
    <div className={st.wrap}>
      <div>{children}</div>
      <div>
        <nav className={st.nav}>
          <Link to="/statistic">
            <ImStatsBars />
            Статистика
          </Link>
          <Link to="/answer">
            <RiQuestionAnswerFill />
            Ответы
          </Link>
          <Link to="/question">
            <BsFillQuestionCircleFill />
            Вопросы
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
