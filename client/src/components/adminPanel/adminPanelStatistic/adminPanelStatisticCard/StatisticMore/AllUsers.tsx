import { useEffect, useState } from "react";
import { getUsers } from "../../../../../api";
import StatisticMoreCard from "./StatisticMoreCard";
import st from "./allusers.module.sass";

const AllUsers = () => {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    getUsers().then((res: any) => {
      setUsers(res);
    });
  }, []);
  return (
    <div className={st.wrapper}>
      <h2 className={st.wrapper__title}>Всего сотрудников</h2>
      <div className={st.wrapper__cards}>
        {users.map((data: any) => {
          return (
            <StatisticMoreCard username={data.username} status={data.online} />
          );
        })}
      </div>
    </div>
  );
};

export default AllUsers;
