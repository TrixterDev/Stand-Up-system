import { useEffect, useState } from "react";
import { getUsers, User } from "../../../../../api";
import StatisticMoreCard from "./StatisticMoreCard";
import st from "./allusers.module.sass";

const Online = () => {
  const [online, setOnline] = useState<User[]>([]);

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
              answer={data.otveties}
              key={data.id}
              avatarka={data.avatarka.url}
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
