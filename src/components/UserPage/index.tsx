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

  const [emailEx, setEmailEx] = useState<boolean>(false);

  const [phoneEx, setPhoneEx] = useState<boolean>(false);

  const [usernameEx, setUsernameEx] = useState<boolean>(false);

  const checkEmailExists = async (userEmail: any) => {
    try {
      const data = await getUsers();
      const usersEmail = data.map((user) => user.email);
      const emailExists = usersEmail.includes(userEmail);
      console.log(emailExists);

      return emailExists;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const checkPhoneExists = async (userPhone: any) => {
    try {
      const data = await getUsers();
      const usersPhone = data.map((user) => user.phone);
      const phoneExists = usersPhone.includes(userPhone);
      console.log(phoneExists);

      return phoneExists;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const checkUsernameExists = async (username: any) => {
    try {
      const data = await getUsers();
      const usernames = data.map((user) => user.username);
      const usernameExists = usernames.includes(username);
      console.log(usernameExists);

      return usernameExists;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  if (!user) {
    return <h2>Loading</h2>;
  }

  if (!Cookie.get("key")) {
    navigate("/");
  }

  const saveUserInfo = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmailExists = await checkEmailExists(updatedUserInfo.email);

    const isPhoneExists = await checkPhoneExists(updatedUserInfo.phone);

    const isUsernameExists = await checkUsernameExists(
      updatedUserInfo.username
    );

    if (isEmailExists) {
      setEmailEx(true);
      console.log("Пользователь с таким email уже существует");
    } else {
      setEmailEx(false);
      console.log("Email изменён");
    }

    if (isPhoneExists) {
      setPhoneEx(true);
      console.log("Пользователь с таким номером телефона уже существует");
    } else {
      setPhoneEx(false);
      console.log("Номер телефона изменён");
    }

    if (isUsernameExists) {
      setUsernameEx(true);
      console.log("Пользователь с таким именем пользователя уже существует");
    } else {
      setUsernameEx(false);
      console.log("Имя пользователя изменено");
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
              {usernameEx ? (
                <label htmlFor="username" className={styles.err}>
                  Имя пользователя не доступно
                </label>
              ) : (
                "Имя пользователя"
              )}
              <Input
                name="username"
                secondClass={styles.input}
                pHText={user.username}
                onChange={handleChange}
                idElem="username"
              />
            </label>

            <label className={styles.emailLabel}>
              {emailEx ? (
                <label htmlFor="email" className={styles.err}>
                  E-mail не доступен
                </label>
              ) : (
                "E-mail"
              )}
              <Input
                name="email"
                secondClass={styles.input}
                pHText={user.email}
                onChange={handleChange}
                idElem="email"
              />
            </label>

            <label className={styles.phoneLabel}>
              {phoneEx ? (
                <label htmlFor="phone" className={styles.err}>
                  Номер телефона не доступен
                </label>
              ) : (
                "Номер телефона"
              )}
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
    </>
  );
};
