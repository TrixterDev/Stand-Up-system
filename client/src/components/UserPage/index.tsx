import { useEffect, useState } from "react";
import { getUserInfo } from "../../api";
import Cookie from "js-cookie";
import styles from "./UserPage.module.sass";
import Btn from "../ui/Btn/Btn";
import { FaEdit, FaShareAlt } from "react-icons/fa";

interface User {
  username: string;
  email: string;
  firstname?: string;
  lastname?: string;
  position?: string;
}

export const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getUserInfo(Cookie.get("key")).then((resp) => {
      console.log(resp);
      setUser((prevUser) => (resp as User) || prevUser);
    });
  }, []);

  if (!user) {
    return <h2>Loading</h2>;
  }

  return (
    <>
      <Btn textBtn="Назад" onClick={() => history.back()} />
      <div className={styles.container}>
        <div className={styles["user-card"]}>
          <img
            src="/img/base-avatar.png"
            alt={`Аватарка пользователя ${user.username}`}
            className={styles.avatar}
          />
          <div className={styles["user-card-info"]}>
            <h2 className={styles.username}>
              {user.firstname
                ? `${user.lastname} ${user.firstname}`
                : `${user.username}`}
            </h2>
            <span className={styles.position}>{user.position}</span>
            <h2 className={styles.email}>{user.email}</h2>
          </div>
          <div className={styles.buttons}>
            <button className={styles.btn}>
              <FaEdit />
            </button>
            <button className={styles.btn}>
              <FaShareAlt />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
