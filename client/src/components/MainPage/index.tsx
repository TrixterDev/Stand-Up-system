// import Cookie from "js-cookie";
// import { useNavigate } from "react-router";
import { getData } from "../../api";
import Card from "./Card";
import st from "./MainPage.module.sass";
import { useEffect, useState } from "react";

export interface questionItem {
  answer: string;
  question: string;
  id: number;
}

const MainPage = () => {
  //   const navigate = useNavigate();
  const [data, setData] = useState<any>();

  useEffect(() => {
    getData().then((res: any) => {
      setData(res.data);
    });
  }, []);

  return (
    <div>
      <div className={st.auth}></div>
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
