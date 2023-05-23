import { useEffect, useState } from "react";
import { getUsers } from "../../../../../../api";
import StatisticMoreCard from "../StatisticMoreCard";
import st from "./allusers.module.sass";

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
            <StatisticMoreCard username={data.username} status={data.online}>
              d
            </StatisticMoreCard>
          );
        })}
      </div>
    </div>
  );
};

export default AllUsers;
