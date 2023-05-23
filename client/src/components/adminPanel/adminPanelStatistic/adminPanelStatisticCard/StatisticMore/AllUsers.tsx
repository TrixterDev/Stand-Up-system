import { useEffect, useState } from "react";
import { getUsers } from "../../../../../api";
import st from "./style.module.sass";

const AllUsers = () => {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    getUsers().then((res: any) => {
      setUsers(res);
    });
  }, []);
  return (
    <div className={st.wrap}>
      <div>
        <h2>Всего сотрудников</h2>
        {users.map((data: any) => {
          return (
            <div>
              <h4>Пользователь: {data.username}</h4>
              <h4>Статус: {data.online ? "Онлайн" : "Офлайн"}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllUsers;
