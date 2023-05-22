// import Cookie from "js-cookie";
// import { useNavigate } from "react-router";
import { getData } from "../../api";
import Card from "./Card";
import st from "./MainPage.module.sass";
import { useEffect, useState } from "react";
const MainPage = () => {
  //   const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    getData().then((res: any) => {
      setData(res.data);
    });
  }, []);

  interface questionItem {
    answer: string;
    question: string;
    id: number;
  }

  return (
    <div>
      <div className={st.auth}></div>
      <div className={st.grid_container}>
        {data &&
          data.map((el<questionItem>, index) => {
            return (
              <Card
                key={el.id}
                data={data}
                productInfo={el}
                index={index}
                id={el.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MainPage;
