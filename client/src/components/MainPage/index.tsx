// import Cookie from "js-cookie";
// import { useNavigate } from "react-router";
import { getData, getUserInfo } from "../../api";
import Card from "./Card";
import st from "./MainPage.module.sass";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import ava from "../../../public/img/base-avatar.png";

export interface questionItem {
  answer: string;
  question: string;
  id: number;
}

const MainPage = () => {
  //   const navigate = useNavigate();
  const [data, setData] = useState<any>();
  const [dataUser, setDataUser] = useState<any>();
  useEffect(() => {
    getUserInfo(Cookie.get("key")).then((response: any) => {
      setDataUser(response);
    });

    getData().then((res: any) => {
      setData(res.data);
    });
  }, []);

  return (
    <div>
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
