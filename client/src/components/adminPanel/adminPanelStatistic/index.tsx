import AdminPanelStatisticCard from "./adminPanelStatisticCard";
import st from "./style.module.sass"
import { HiUser , HiUserGroup , HiUserRemove } from "react-icons/hi";
const PanelStatistic = () => {
  return (
    <div className={st.PanelStats}>
      <AdminPanelStatisticCard title="Всего сотрудников">
      <HiUserGroup color="#f0f0f0" size={70} />
      </AdminPanelStatisticCard>
      <AdminPanelStatisticCard title="Всего сотрудников онлайн">
        <HiUser color="#f0f0f0" size={70} />
      </AdminPanelStatisticCard>
      <AdminPanelStatisticCard title="Всего сотрудников оффлайн">
        <HiUserRemove color="#f0f0f0" size={70} />
      </AdminPanelStatisticCard>
    </div>
  );
};

export default PanelStatistic;
