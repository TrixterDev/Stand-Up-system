import { useEffect, useState } from "react";
import { getUsers } from "../../../../../api";
import StatisticMoreCard from "./StatisticMoreCard";
import st from "./allusers.module.sass";

const Offline = () => {
  const [offline, setOffline] = useState<any>([]);

  useEffect(() => {
    getUsers().then((res: any) => {
      const offlineUsers = res.filter((data: any) => !data.online);

      setOffline(offlineUsers);
    });
  }, []);
  return (
    <div className={st.wrapper}>
      <h2 className={st.wrapper__title}>Всего сотрудников оффлайн</h2>
      <div className={st.wrapper__cards}>
        {offline.map((data: any) => {
          return (
            <StatisticMoreCard username={data.username} status={data.online} />
          );
        })}
      </div>
    </div>
  );
};

export default Offline;
