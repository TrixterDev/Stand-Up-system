import AdminPanelStatisticCard from "./adminPanelStatisticCard";
import st from "./style.module.sass";
import { HiUser, HiUserGroup, HiUserRemove } from "react-icons/hi";
import { useEffect } from "react";
import { getUser } from "../../../api";
import { useState } from "react";
import { useNavigate } from "react-router";

const PanelStatistic = () => {
  const [users, setUsers] = useState<any>([]);
  const [online, setOnline] = useState<any>([]);
  const [offline, setOffline] = useState<any>([]);
  const redirect = useNavigate();

  useEffect(() => {
    getUser().then((res: any) => {
      setUsers(res);
      const onlineUsers = res.filter((data: any) => data.online);
      const offlineUsers = res.filter((data: any) => !data.online);

      setOnline(onlineUsers);
      setOffline(offlineUsers);
    });
  }, []);

  return (
    <div className={st.Panel}>
      <div className={st.Panel__Stats}>
        <AdminPanelStatisticCard
          click={() => redirect("/admin-page/statistic/all-users")}
          count={users.length}
          title="Всего сотрудников"
        >
          <HiUserGroup color="#f0f0f0" size={70} />
        </AdminPanelStatisticCard>
        <AdminPanelStatisticCard
          click={() => redirect("/admin-page/statistic/online")}
          count={online.length}
          title="Всего сотрудников онлайн"
        >
          <HiUser color="#f0f0f0" size={70} />
        </AdminPanelStatisticCard>
        <AdminPanelStatisticCard
          click={() => redirect("/admin-page/statistic/offline")}
          count={offline.length}
          title="Всего сотрудников оффлайн"
        >
          <HiUserRemove color="#f0f0f0" size={70} />
        </AdminPanelStatisticCard>
      </div>
    </div>
  );
};

export default PanelStatistic;
