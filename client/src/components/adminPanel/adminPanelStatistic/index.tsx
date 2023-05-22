import AdminPanelStatisticCard from "./adminPanelStatisticCard";
import st from "./style.module.sass";
import { HiUser, HiUserGroup, HiUserRemove } from "react-icons/hi";
import { useEffect } from "react";
import { getUsers } from "../../../api";
import { useState } from "react";

// interface user{
//     id: number,
//     username: string,
//     email: string,
// }

const PanelStatistic = () => {
  const [users, setUsers] = useState<any>([]);
  const [online, setOnline] = useState<any>([]);
  const [offline, setOffline] = useState<any>([]);

  useEffect(() => {
    getUsers().then((res: any) => {
      setUsers(res);
      const onlineUsers = res.filter((data: any) => data.online);
      const offlineUsers = res.filter((data: any) => !data.online);

      setOnline(onlineUsers);
      setOffline(offlineUsers);
    });
  }, []);

  return (
    <div className={st.PanelStats}>
      <AdminPanelStatisticCard click={0} count={users.length} title="Всего сотрудников">
        <HiUserGroup color="#f0f0f0" size={70} />
      </AdminPanelStatisticCard>
      <AdminPanelStatisticCard
        click={0}
        count={online.length}
        title="Всего сотрудников онлайн"
      >
        <HiUser color="#f0f0f0" size={70} />
      </AdminPanelStatisticCard>
      <AdminPanelStatisticCard
        click={0}
        count={offline.length}
        title="Всего сотрудников оффлайн"
      >
        <HiUserRemove color="#f0f0f0" size={70} />
      </AdminPanelStatisticCard>
    </div>
  );
};

export default PanelStatistic;
