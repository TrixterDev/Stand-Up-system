import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./Page/Home";
import "../src/App.sass";
import { UserPage } from "./components/UserPage";
import PanelStatistic from "./components/adminPanel/adminPanelStatistic";
import PanelAnswer from "./components/adminPanel/adminPanelAnswers";
import PanelQuestion from "./components/adminPanel/adminPanelQuestion";
import Online from "./components/adminPanel/adminPanelStatistic/adminPanelStatisticCard/StatisticMore/online";
import Offline from "./components/adminPanel/adminPanelStatistic/adminPanelStatisticCard/StatisticMore/offline";
import AllUsers from "./components/adminPanel/adminPanelStatistic/adminPanelStatisticCard/StatisticMore/AllUsers";
import Layout from "./components/Layout";
import Cookie from "js-cookie";
import { useState, useEffect } from "react";
import ArchivePage from "./components/adminPanel/Draft";
import { UserLayout } from "./components/Layout/UserLayout";
import { Login } from "./components/Auth/Login";
import { RegisterPage } from "./components/Auth/Register";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {}, [navigate, pathname]);
  if (Cookie.get("role") === "Admin") {
    return (
      <Layout>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          <Route path="/admin-page/statistic">
            <Route index element={<PanelStatistic />} />
            <Route path="online" element={<Online />} />
            <Route path="offline" element={<Offline />} />
            <Route path="all-users" element={<AllUsers />} />
          </Route>
          <Route path="/admin-page/answer" element={<PanelAnswer />} />
          <Route path="/admin-page/question" element={<PanelQuestion />} />
          <Route path="/admin-page/archive" element={<ArchivePage />} />
          {/* <Route path="/user-page" element={<UserPage />} /> */}
        </Routes>
      </Layout>
    );
  } else {
    return (
      <UserLayout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user-page" element={<UserPage />} />
        </Routes>
      </UserLayout>
    );
  }
}
export default App;
