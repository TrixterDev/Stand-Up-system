import React, { useEffect, useState } from "react";
import {
  changeImage,
  changeUserInfo,
  getUserInfo,
  getUsers,
  uploadImage,
} from "../../api";
import Cookie from "js-cookie";
import styles from "./UserPage.module.sass";
import Btn from "../ui/Btn/Btn";
import { FaEdit, FaEnvelope, FaPhone, FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { Modal } from "../ui/Modal";
import Input from "../ui/Input/Input";

export interface User {
  username?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  position?: string;
  phone?: string;
  avatarka?: string;
}

export const UserPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUserInfo(Cookie.get("key")).then((resp) => {
      setUser((prevUser) => (resp as User) || prevUser);
    });
  }, []);

  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const [avatar, setAvatar] = useState<string>("");

  const [userInfo, setUserInfo] = useState<User>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
  });

  const [updatedUserInfo, setUpdatedUserInfo] = useState<User>({});

  const [modalValidation, setModalValidation] = useState({
    emailValid: false,
    phoneValid: false,
    usernameValid: false,
  });

  if (!user) {
    return <h2>Loading</h2>;
  }

  if (!Cookie.get("key")) {
    navigate("/");
  }

  const saveUserInfo = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        const image = new FormData();
        image.append("files", avatar);
        const setAvatar = async (file) => {
          if (user.avatarka) {
            await changeImage(file, user.avatarka.id).then((resp) => {
              setUpdatedUserInfo((prev: any) => {
                return { ...prev, avatarka: resp[0] };
              });
            });
          } else {
            await uploadImage(file).then((resp) => {
              setUpdatedUserInfo((prev: any) => {
                return { ...prev, avatarka: resp[0] };
              });
            });
          }
        };

        await setAvatar(image);

        await changeUserInfo(updatedUserInfo, user.id).then((resp) => {
          setShowEditModal(false);

          if (updatedUserInfo.avatarka) {
            setUser((prev) => {
              return { ...prev, ...resp.avatarka };
            });
          }
        });
      } catch (error) {
        alert("Произошла ошибка");
      } finally {
        // location.reload();
      }
    };
    fetchData();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
    setUpdatedUserInfo((prev: any) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const addAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatar(e.target.files[0]);
  };

  return (
    <div className={styles.userPage}>
      <div className={styles.container}>
        <Btn
          textBtn="Назад"
          onClick={() => navigate("/home")}
          dC={styles["back-btn"]}
        />
        <div className={styles["user-card"]}>
          <img
            src={user.avatarka ? user.avatarka.url : "/img/base-avatar.png"}
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
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h2 className={styles.email}>
                <FaEnvelope /> {user.email}
              </h2>
              {user.phone && (
                <h2 className={styles.phone}>
                  <FaPhone /> {user.phone}
                </h2>
              )}
            </div>
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.btn}
              onClick={() => setShowEditModal(true)}
            >
              <FaEdit />
            </button>
            <button className={styles.btn}>
              <FaShareAlt />
            </button>
          </div>
        </div>
      </div>

      <Modal isVisible={showEditModal} setIsVisible={setShowEditModal}>
        <form onSubmit={saveUserInfo}>
          <div className={styles.form}>
            <label className={styles.avatarLabel}>
              Аватарка
              {avatar !== "" && (
                <img
                  src={URL.createObjectURL(avatar)}
                  className={styles.image}
                />
              )}
              <Input
                secondClass={styles.input}
                typeElem="file"
                onChange={addAvatar}
              />
            </label>

            <label className={styles.firstnameLabel}>
              Имя
              <Input
                name="firstname"
                secondClass={styles.input}
                pHText={user.firstname}
                onChange={handleChange}
              />
            </label>

            <label className={styles.lastnameLabel}>
              Фамилия
              <Input
                name="lastname"
                secondClass={styles.input}
                pHText={user.lastname}
                onChange={handleChange}
              />
            </label>

            <label className={styles.usernameLabel}>
              Имя пользователя
              <Input
                name="username"
                secondClass={styles.input}
                pHText={user.username}
                onChange={handleChange}
                idElem="username"
              />
            </label>

            <label className={styles.emailLabel}>
              Email
              <Input
                name="email"
                secondClass={styles.input}
                pHText={user.email}
                onChange={handleChange}
                idElem="email"
              />
            </label>

            <label className={styles.phoneLabel}>
              Номер телефона
              <Input
                name="phone"
                secondClass={styles.input}
                pHText={user.phone}
                onChange={handleChange}
                idElem="phone"
              />
            </label>
          </div>
          <Btn textBtn="Сохранить" dC={styles.saveBtn} />
        </form>
      </Modal>
    </div>
  );
};
