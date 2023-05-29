import React, { useEffect, useState } from "react";
import { changeUserInfo, getUserInfo, getUsers, uploadImage } from "../../api";
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
  avatar?: any;
}

export const UserPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getUserInfo(Cookie.get("key")).then((resp) => {
      console.log(resp);
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

  // * //

  const checkEmailExists = async (updatedUserInfo) => {
    try {
      const res = await getUsers();
      const usersEmail = res.data.email;
      return usersEmail.length > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // Пример использования
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const emailExists = await checkEmailExists(email);

    if (emailExists) {
      console.log("Пользователь с таким email уже существует!");
      // Дополнительная логика, если email уже существует
    } else {
      console.log("Email доступен для регистрации!");
      // Дополнительная логика, если email доступен для регистрации
    }
  };

  // * //

  if (!user) {
    return <h2>Loading</h2>;
  }

  if (!Cookie.get("key")) {
    navigate("/");
  }

  const saveUserInfo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const email = e.target.email.value;
    const emailExists = await checkEmailExists(email);

    if (emailExists) {
      console.log("Пользователь с таким email уже существует!");
      // Дополнительная логика, если email уже существует
    } else {
      console.log("Email доступен для регистрации!");
      // Дополнительная логика, если email доступен для регистрации
    }

    if (avatar !== "") {
      const image = new FormData();
      image.append("files", avatar);
      await uploadImage(image).then((resp) => {
        setUpdatedUserInfo((prev: any) => {
          return { ...prev, avatar: resp[0] };
        });
      });
    }
    changeUserInfo(updatedUserInfo, user.id).then((resp) => {
      setShowEditModal(false);
    });
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
    <>
      <div className={styles.container}>
        <Btn
          textBtn="Назад"
          onClick={() => navigate("/home")}
          dC={styles["back-btn"]}
        />
        <div className={styles["user-card"]}>
          <img
            src={user.avatar ? user.avatar.url : "/img/base-avatar.png"}
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
            <button className={styles.btn}>
              <FaEdit onClick={() => setShowEditModal(true)} />
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
            <label className={styles.firstnameLabel}>
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
              />
            </label>

            <label className={styles.emailLabel}>
              E-mail
              <Input
                name="email"
                secondClass={styles.input}
                pHText={user.email}
                onChange={handleChange}
              />
            </label>

            <label className={styles.phoneLabel}>
              Номер телефона
              <Input
                name="phone"
                secondClass={styles.input}
                pHText={user.phone}
                onChange={handleChange}
              />
            </label>
          </div>
          <Btn textBtn="Сохранить" dC={styles.saveBtn} />
        </form>
      </Modal>
    </>
  );
};
