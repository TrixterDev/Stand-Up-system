// import Cookie from "js-cookie";
// import { useNavigate } from "react-router";
import { GetloginUser, getData, getUserInfo } from "../../api";
import Card from "./Card";
import st from "./MainPage.module.sass";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import ava from "../../../public/img/base-avatar.png";
import { Modal } from "../ui/Modal";
import Input from "../ui/Input/Input";

export interface questionItem {
  answer: string;
  question: string;
  id: number;
}
interface formKeys {
  about: string;
}

const MainPage = () => {
  //   const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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

  // useEffect(() => {
  //   if (dataUser) {
  //     GetloginUser(Cookie.get("key"), form, dataUser.id).then((el) => {
  //       setloginUser(el);
  //       console.log(el);
  //     });
  //   }
  // }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    GetloginUser(Cookie.get("key"), form.about, dataUser.id).then((el) => {
      setloginUser(el);
      console.log(el);
    });
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
        <img className={st.ava} src={ava} alt="img" />
        <span>{dataUser?.username}</span>
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
