import { useEffect, useState } from "react";
import { getUsers } from "../../../../../api";

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
          <div key={data.id}>
            <h4>Пользователь: {data.username}</h4>
            <h4>Статус: oфлайн</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Offline;
