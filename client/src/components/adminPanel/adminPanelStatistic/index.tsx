import AdminPanelStatisticCard from "./adminPanelStatisticCard";
import st from "./style.module.sass";
import { HiUser, HiUserGroup, HiUserRemove } from "react-icons/hi";
import { useEffect } from "react";
import { getUser } from "../../../api";
import { useState } from "react";

// interface user{
//     id: number,
//     username: string,
//     email: string,
// }


const PanelStatistic = () => {
  const [users, setUsers] = useState<any>([]);
  console.log(users.length);
  
  useEffect(() => {
    getUser().then((res: any) => setUsers(res));
  }, []);
  return (
    <div className={st.PanelStats}>
      <AdminPanelStatisticCard click={0} count={users.length} title="Всего сотрудников">
        <HiUserGroup color="#f0f0f0" size={70} />
      </AdminPanelStatisticCard>
      <AdminPanelStatisticCard
        click={0}
        count={0}
        title="Всего сотрудников онлайн"
      >
        <HiUser color="#f0f0f0" size={70} />
      </AdminPanelStatisticCard>
      <AdminPanelStatisticCard
        click={0}
        count={0}
        title="Всего сотрудников оффлайн"
      >
        <HiUserRemove color="#f0f0f0" size={70} />
      </AdminPanelStatisticCard>
    </div>
  );
};

export default PanelStatistic;
