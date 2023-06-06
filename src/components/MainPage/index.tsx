import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { GetloginUser, getCategories, getData, getUserInfo } from "../../api";
import Input from "../ui/Input/Input";
import { Modal } from "../ui/Modal";
import Card from "./Card";
import st from "./MainPage.module.sass";
import Select from "../ui/Select";
import { BiExit } from "react-icons/bi";
import { CgOptions } from "react-icons/cg";
export interface questionItem {
  answer: string;
  question: string;
  id: number;
  title: string;
  category?: any;
}
interface formKeys {
  about: string;
}

const MainPage = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [xz, setXz] = useState<any>();
  const [data, setData] = useState<any>();
  const [loginUser, setloginUser] = useState<any>();
  const [dataUser, setDataUser] = useState<any>();
  const [form, setForm] = useState<formKeys>({
    about: "",
  });
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

    getCategories().then((xz: any) => {
      setXz(xz.data);
    });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    GetloginUser(Cookies.get("key"), form.about, dataUser.id).then((el) => {
      setloginUser(el);
    });
    setShowModal(false);
  };

  const handleInput = (event: any) => {
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
                attributes: questionItem;
              },
              index: number
            ) => {
              return (
                <Card
                  key={el.id}
                  productInfo={el.attributes}
                  id={el.id}
                  userId={dataUser.id}
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
