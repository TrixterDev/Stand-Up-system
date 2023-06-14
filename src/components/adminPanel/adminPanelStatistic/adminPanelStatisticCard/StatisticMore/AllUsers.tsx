import { useEffect, useState } from "react";
import { getUsers } from "../../../../../api";
import StatisticMoreCard from "./StatisticMoreCard";
import st from "./allusers.module.sass";
import { User } from "../../../../UserPage";

const AllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((res: any) => {
      setUsers(res);
    });
  }, []);
  return (
    <div className={st.wrapper}>
      <h2 className={st.wrapper__title}>Всего сотрудников</h2>
      <div className={st.wrapper__cards}>
        {users
          .sort((a: any, b: any) =>
            a.online && !b.online ? -1 : b.online && !a.online ? 1 : 0
          )
          .map((data: User) => (
            <StatisticMoreCard
              answer={data.otveties}
              key={data.id}
              avatarka={data?.avatarka?.url || "/img/base-avatar.png"}
              username={data.username}
              status={data.online}
            />
          ))}
      </div>
    </div>
  );
};

export default AllUsers;
