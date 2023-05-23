import { useEffect, useState } from "react";
import { getUsers } from "../../../../../../api";
import StatisticMoreCard from "../StatisticMoreCard";

const Offline = () => {
  const [offline, setOffline] = useState<any>([]);

  useEffect(() => {
    getUsers().then((res: any) => {
      const offlineUsers = res.filter((data: any) => !data.online);

      setOffline(offlineUsers);
    });
  }, []);
  return (
    <div>
      <h2>Сотрудники офлайн</h2>
      {offline.map((data: any) => {
        return (
          <StatisticMoreCard username={data.username} status={data.online}>
            d
          </StatisticMoreCard>
        );
      })}
    </div>
  );
};

export default Offline;
