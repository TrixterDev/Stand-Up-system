import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {
  GetloginUser,
  changeUserInfo,
  changeUserOnline,
  getCategories,
  getData,
  getUserInfo,
  getUsers,
} from "../../api";
import Input from "../ui/Input/Input";
import { Modal } from "../ui/Modal";
import Card from "./Card";
import st from "./MainPage.module.sass";
import Select from "../ui/Select";
import { BiExit } from "react-icons/bi";
import { CgOptions } from "react-icons/cg";

interface QuestionItem {
  answer: string;
  question: string;
  id: number;
  title: string;
  category?: any;
}

interface FormKeys {
  about: string;
}

interface props {
  id: number;
}

const MainPage: React.FC<props> = ({ id }) => {
  const navigate = useNavigate();

  const [offline, setOffline] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [xz, setXz] = useState<any>();
  const [data, setData] = useState<any>();
  const [loginUser, setLoginUser] = useState<any>();
  const [dataUser, setDataUser] = useState<any>();
  const [form, setForm] = useState<FormKeys>({
    about: "",
  });

  const status = {
    online: false,
  };

  console.log(id);

  useEffect(() => {
    const key = Cookies.get("key");
    if (key !== undefined) {
      getUserInfo().then((response: any) => {
        setDataUser(response);

        if (response.about === "" || response.about === null) {
          setShowModal(true);
        }
      });
    }

    getData().then((res: any) => {
      setData(res.data);
    });

    getUsers().then((res: any) => {
      setUsers(res);
      const offlineUsers = res.filter((data: any) => !data.online);

      setOffline(offlineUsers);
    });

    getCategories().then((xz: any) => {
      setXz(xz.data);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    GetloginUser(Cookies.get("key"), form.about, dataUser?.id).then(
      (el: any) => {
        setLoginUser(el);
      }
    );
    setShowModal(false);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const filteredData = data
    ? data.filter(
        (el: any) =>
          el.attributes.category.data.attributes.category_name ===
          selectedCategory
      )
    : [];

  return (
    <div>
      {xz &&
        xz.map((el: any) => {
          return (
            <div key={el.id} className={st.mod}>
              <button
                className={st.btn}
                onClick={() => handleCategoryClick(el.attributes.category_name)}
              >
                {el.attributes.category_name}
              </button>
            </div>
          );
        })}
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <form onSubmit={handleSubmit} className={st.modal_text}>
          <span>tell me about you</span>
          <Input name="about" idElem="about" onChange={handleInput} required />
          <button>send</button>
        </form>
        <button onClick={() => setShowModal(false)}>skip</button>
      </Modal>
      <div className={st.auth}>
        <Select
          title={dataUser?.username}
          src="./img/base-avatar.png"
          top={"70px"}
        >
          <h4
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid white",
            }}
            onClick={() => {
              navigate("/user-page");
            }}
          >
            <CgOptions size={"30px"} /> Настройки
          </h4>
          <h4
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid white",
              width: "135px",
              gap: "5px",
            }}
            onClick={() => {
              changeUserOnline(status, Number(Cookies.get("idUser")));
              Cookies.remove("key");
              Cookies.remove("role");
              navigate("/");
            }}
          >
            <BiExit size={"30px"} /> Выход
          </h4>
        </Select>
      </div>
      <div className={st.grid_container}>
        {filteredData &&
          filteredData.map(
            (
              el: {
                id: number;
                attributes: QuestionItem;
              },
              index: number
            ) => {
              return (
                <Card
                  key={el.id}
                  productInfo={el.attributes}
                  id={el.id}
                  userId={dataUser?.id}
                  category_id={el.attributes.category.data.id}
                />
              );
            }
          )}
      </div>
    </div>
  );
};

export default MainPage;
