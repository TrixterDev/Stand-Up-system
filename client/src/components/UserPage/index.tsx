import { useEffect, useState } from "react";
import { getUserInfo } from "../../api";
import Cookie from "js-cookie";
import styles from "./UserPage.module.sass";
import Btn from "../ui/Btn/Btn";
import { FaEdit, FaEnvelope, FaPhone, FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { Modal } from "../ui/Modal";
import Input from "../ui/Input/Input";

interface User {
  username: string;
  email: string;
  firstname?: string;
  lastname?: string;
  position?: string;
  phone?: string
}

export const UserPage = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getUserInfo(Cookie.get("key")).then((resp) => {
      console.log(resp);
      setUser((prevUser) => (resp as User) || prevUser);
    });
  }, []);

  const [showEditModal, setShowEditModal] = useState<boolean>(true)

  if (!user) {
    return <h2>Loading</h2>;
  }

  if (!Cookie.get("key")) {
    navigate("/")
  }


  return (
    <>
      <div className={styles.container}>
      <Btn textBtn="Назад" onClick={() => navigate('/home')} dC={styles['back-btn']}/>
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
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <h2 className={styles.email}> <FaEnvelope/> {user.email}</h2>
              {user.phone && <h2 className={styles.phone}> <FaPhone/> {user.phone}</h2>}
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.btn}>
              <FaEdit onClick={() => setShowEditModal(true)}/>
            </button>
            <button className={styles.btn}>
              <FaShareAlt />
            </button>
          </div>
        </div>
      </div>

      <Modal isVisible={showEditModal} setIsVisible={setShowEditModal}>
        <div className={styles.form}>
          <Input pHText="Имя" value={user.firstname}/>
        </div>
      </Modal>
    </>
  );
};
