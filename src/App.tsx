import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Page/Home";
import "../src/App.sass";
import Auth from "./components/Auth/Auth";
import Register from "./components/Auth/Register";
import { UserPage } from "./components/UserPage";
import AdminPage from "./Page/AdminPage";
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

function App() {
  const navigate = useNavigate();

  useEffect(() => {}, [navigate]);
  if (Cookie.get("role") === "admin") {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-page/statistic">
            <Route index element={<PanelStatistic />} />
            <Route path="online" element={<Online />} />
            <Route path="offline" element={<Offline />} />
            <Route path="all-users" element={<AllUsers />} />
          </Route>
          <Route path="/admin-page/answer" element={<PanelAnswer />} />
          <Route path="/admin-page/question" element={<PanelQuestion />} />
          <Route path="/admin-page/archive" element={<ArchivePage />} />
        </Routes>
      </Layout>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-page" element={<UserPage />} />
      </Routes>
    );
  }
}
export default App;
