import { useEffect, useState } from "react";
import { getUsers, User } from "../../../../../api";
import StatisticMoreCard from "./StatisticMoreCard";
import st from "./allusers.module.sass";

const Offline = () => {
  const [offline, setOffline] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((res: any) => {
      const offlineUsers = res.filter((data: any) => !data.online);
      console.log(res[0]);

      setOffline(offlineUsers);
    });
  }, []);
  return (
    <div className={st.wrapper}>
      <h2 className={st.wrapper__title}>Всего сотрудников оффлайн</h2>
      <div className={st.wrapper__cards}>
        {offline.map((data: any) => {
          return (
            <StatisticMoreCard
              answer={data.otveties}
              key={data.id}
              avatarka={data?.avatarka?.url || "/img/base-avatar.png"}
              username={data.username}
              status={data.online}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Offline;
