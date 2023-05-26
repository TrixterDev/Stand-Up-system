import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { GetloginUser, getData, getUserInfo } from "../../api";
import Input from "../ui/Input/Input";
import { Modal } from "../ui/Modal";
import Card from "./Card";
import st from "./MainPage.module.sass";
import Select from "../ui/Select";
import ava from "../../../public/img/base-avatar.png";
import { BiExit } from "react-icons/bi";
import { CgOptions } from "react-icons/cg";
export interface questionItem {
  answer: string;
  question: string;
  id: number;
}
interface formKeys {
  about: string;
}

const MainPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState<any>();
  const [loginUser, setloginUser] = useState<any>();
  const [dataUser, setDataUser] = useState<any>();
  const [form, setForm] = useState<formKeys>({
    about: "",
  });
  useEffect(() => {
    const key = Cookies.get("key");
    if (key !== undefined) {
      getUserInfo(key).then((response: any) => {
        setDataUser(response);

        if (response.about === "" || response.about === null) {
          setShowModal(true);
        }
      });
    }

    getData().then((res: any) => {
      setData(res.data);
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
        <Select title={dataUser?.username} src={ava} top={"70px"}>
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
              navigate("/");
            }}
          >
            <BiExit size={"30px"} /> Выход
          </h4>
        </Select>
      </div>
      <div className={st.grid_container}>
        {data &&
          data.map(
            (
              el: {
                id: number;
                attributes: questionItem;
              },
              index: number
            ) => {
              return (
                <Card key={el.id} productInfo={el.attributes} id={el.id} />
              );
            }
          )}
      </div>
    </div>
  );
};

export default MainPage;
