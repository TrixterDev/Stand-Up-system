import { useEffect, useState } from "react";
import { getUsers } from "../../../../../api";
import StatisticMoreCard from "./StatisticMoreCard";
import st from "./allusers.module.sass";

const Online = () => {
  const [online, setOnline] = useState<any>([]);

  useEffect(() => {
    getUsers().then((res: any) => {
      const onlineUsers = res.filter((data: any) => data.online);
      setOnline(onlineUsers);
    });
  }, []);
  return (
    <div className={st.wrapper}>
      <h2 className={st.wrapper__title}>Всего сотрудников онлайн</h2>
      <div className={st.wrapper__cards}>
        {online.map((data: any) => {
          return (
            <StatisticMoreCard
              key={data.id}
              avatarka={data.avatarka}
              username={data.username}
              status={data.online}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Online;
