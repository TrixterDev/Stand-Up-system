import { useNavigate } from "react-router";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { GetloginUser, getData, getUserInfo } from "../../api";
import Input from "../ui/Input/Input";
import { Modal } from "../ui/Modal";
import Card from "./Card";
import st from "./MainPage.module.sass";
import { Select } from "./Select";

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
  const [showTooltip, setShowTooltip] = useState(false);

  const [data, setData] = useState<any>();
  const [loginUser, setloginUser] = useState<any>();
  const [dataUser, setDataUser] = useState<any>();
  const [form, setForm] = useState<formKeys>({
    about: "",
  });
  useEffect(() => {
    getUserInfo(Cookie.get("key")).then((response: any) => {
      setDataUser(response);

      if (response.about === "" || response.about === null) {
        setShowModal(true);
      }
    });

    getData().then((res: any) => {
      setData(res.data);
    });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    GetloginUser(Cookie.get("key"), form.about, dataUser.id).then((el) => {
      setloginUser(el);
    });
  };

  const handleInput = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
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
        <form onClick={onSubmit}>
          <select
            className={st.select_css}
            onChange={(event) => {
              if (event?.target.value === "Выйти") {
                Cookie.remove("key");
                navigate("/");
              }
              if (event?.target.value === "Настройки") {
                Cookie.remove("key");
                navigate("/user-page");
              }
            }}
          >
            <option>
              <span className={st.back}> </span>
            </option>
            <option>{dataUser?.username}</option>
            <option>Настройки</option>
            <option>Выйти</option>
          </select>
        </form>
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
