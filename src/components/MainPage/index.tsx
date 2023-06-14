import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getData, getUserInfo, getUsers, getCategories } from "../../api";
import Input from "../ui/Input/Input";
import { Modal } from "../ui/Modal";
import Card from "./Card";
import st from "./MainPage.module.sass";
import Select from "../ui/Select";
import { BiExit } from "react-icons/bi";
import { CgOptions } from "react-icons/cg";
import { format } from "date-fns";

export interface QuestionItem {
  answer: string;
  question: string;
  id: number;
  title: string;
  category?: any;
}

interface FormKeys {
  about: string;
}

const MainPage = () => {
  const navigate = useNavigate();

  const [offline, setOffline] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  const [xz, setXz] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [loginUser, setLoginUser] = useState<any>(null);
  const [dataUser, setDataUser] = useState<any>(null);
  const [form, setForm] = useState<FormKeys>({
    about: "",
  });

  useEffect(() => {
    const key = Cookies.get("key");
    if (key !== undefined) {
      getUserInfo().then((response: any) => {
        setDataUser(response);
        setData(
          response.access_questions.map((item) => {
            return { ...item, category: item.category.id };
          })
        );

        if (response.about === "" || response.about === null) {
          setShowModal(true);
        }
      });
    }

    // getData().then((res: any) => {
    //   setData(res.data);
    // });

    getUsers().then((res: any) => {
      const filteredUsers = res.filter(
        (user: any) => user.access_questions !== null
      );
      setUsers(filteredUsers);
      const offlineUsers = filteredUsers.filter((user: any) => !user.online);
      setOffline(offlineUsers);
    });

    getCategories().then((xz: any) => {
      setXz(xz.data);
    });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowModal(false);
    // Rest of the code...
  };

  const handleInput = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
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
        {data.map(
          (el: { id: number; attributes: QuestionItem }, index: number) => {
            console.log(el);
            const categoryID = el.category;
            return (
              <Card
                key={el.id}
                productInfo={el}
                id={el.id}
                userId={dataUser?.id}
                category_id={categoryID}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default MainPage;
