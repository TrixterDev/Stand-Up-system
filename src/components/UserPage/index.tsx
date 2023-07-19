import React, { useEffect, useState } from "react";
import {
  changeImage,
  changeUserInfo,
  getUserInfo,
  uploadImage,
} from "../../api";
import Cookie from "js-cookie";
import styles from "./UserPage.module.sass";
import { FaEdit, FaEnvelope, FaPhone, FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { Modal } from "../ui/Modal";
import Input from "../ui/Input/Input";
import { Button, IconButton, Slide, SlideProps, Tooltip } from "@mui/material";
import { useSnackbar } from "notistack";

export interface User {
  username?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  position?: string;
  phone?: string;
  avatarka?: any;
}

export const UserPage = () => {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUserInfo(Cookie.get("key")).then((resp) => {
      setUser((prevUser) => (resp as User) || prevUser);
    });
  }, []);

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);

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

  type TransitionProps = Omit<SlideProps, "direction">;

  function TransitionLeft(props: TransitionProps) {
    return <Slide {...props} direction="left" />;
  }

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
        let userInfo = { ...updatedUserInfo };
        const image = new FormData();
        image.append("files", avatar);
        if (user.avatarka) {
          await changeImage(image, user.avatarka.id).then((resp) => {
            console.log("avatar successfully changed");
            enqueueSnackbar("Аватарка успешно изменена", {
              variant: "success",
            });
          });
        } else {
          await uploadImage(image).then((resp) => {
            console.log("avatar successfully sent to server");
            userInfo = { ...userInfo, avatarka: resp[0] };
          });
        }

        if (userInfo) {
          await changeUserInfo(userInfo, user.id).then((resp) => {
            setShowEditModal(false);
          });
        }
      } catch (error) {
        alert("Произошла ошибка");
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
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    } else {
      addAvatar(null);
    }
  };

  return (
    <div className={styles.userPage}>
      <div className={styles.container}>
        <Tooltip title="Назад">
          <Button
            variant="contained"
            style={{ background: "#333", alignSelf: "flex-start" }}
            onClick={() => navigate("/home")}
          >
            Назад
          </Button>
        </Tooltip>
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
            <Tooltip title="Редактировать">
              {/* <button
                className={styles.btn}
                onClick={() => setShowEditModal(true)}
              >
                <FaEdit />
              </button> */}

              <IconButton onClick={() => setShowEditModal(true)}>
                <FaEdit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Поделиться">
              <IconButton onClick={() => enqueueSnackbar("Недоступно")}>
                <FaShareAlt />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>

      <Modal isVisible={showEditModal} setIsVisible={setShowEditModal}>
        <form onSubmit={saveUserInfo}>
          <div className={styles.form}>
            <label className={styles.avatarLabel}>
              Аватарка
              {avatar && (
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
          <Button variant="contained" style={{ width: "100%", marginTop: 15 }}>
            Сохранить
          </Button>
        </form>
      </Modal>
    </div>
  );
};
