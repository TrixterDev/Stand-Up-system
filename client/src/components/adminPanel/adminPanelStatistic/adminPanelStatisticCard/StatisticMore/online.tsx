import { useEffect, useState } from "react";
import { getUsers } from "../../../../../api";
import st from "./style.module.sass";

const APSCmore = () => {
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
            <div>
              <h4>Пользователь: {data.username}</h4>
              <h4>Статус: онлайн</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default APSCmore;
