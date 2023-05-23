import { useEffect, useState } from "react";
import { getUsers } from "../../../../../../api";
import StatisticMoreCard from "../StatisticMoreCard";
import st from "./online.module.sass";

const online = () => {
  const [online, setOnline] = useState<any>([]);

  useEffect(() => {
    getUsers().then((res: any) => {
      const onlineUsers = res.filter((data: any) => data.online);
      setOnline(onlineUsers);
    });
  }, []);
  return (
    <div className={st.wrap}>
      <div>
        <h2>Сотрудники онлайн</h2>
        {online.map((data: any) => {
          return (
            <StatisticMoreCard username={data.username} status={data.online}>
              d
            </StatisticMoreCard>
          );
        })}
      </div>
    </div>
  );
};

export default online;
