import React from "react";
import st from "./style.module.sass";
import { Link } from "react-router-dom";
interface props {
  children: any;
}
const Layout: React.FC<props> = ({ children }) => {
  return (
    <div className={st.wrap}>
      <div>{children}</div>
      <div>
        <nav className={st.nav}>
          <Link to="">btn</Link>
          <Link to="">btn2</Link>
          <Link to="">btn3</Link>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
