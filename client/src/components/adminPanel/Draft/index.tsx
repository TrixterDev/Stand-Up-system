import { useEffect, useState } from "react";
import { getUsers } from "../../../api";
import Btn from "../../ui/Btn/Btn";
import DraftCard from "./DraftCard";
import st from "./style.module.sass";
const Draft = () => {
  const [users, setUsers] = useState<any>({
    username: "",
    avatar: "",
  });
  const [question, setQuestion] = useState<any>([]);
  const [answers, setAnswers] = useState<any>([]);
  const almaz = () => {
    console.log("prosto tak pokachto");
  };
  useEffect(() => {
    getUsers().then((res: any) => {
      setUsers(res);
    });
  }, []);
  return (
    <section className={st.container}>
      <h2 className={st.text}>Архив ответов и вопросов</h2>
      <div className={st.wrapper}>
        <div className={st.wrapper__cards}>
          <span className={st.text && st.span}>Ответы:</span>
          {/* ЗДЕСЬ ДОЛЖЕН БЫТЬ ИНПУТ С ФИЛЬТРОМ ПОИСК ПО ИМЕНИ И ПО Id */}
          <div className={st.changeCategory}>
            <Btn
              dC={st.btn}
              onClick={almaz}
              type="button"
              textBtn="Измененные"
            />
            <Btn
              dC={st.btn}
              onClick={almaz}
              type="button"
              textBtn="Удаленные"
            />
          </div>
          <div className={st.card}>
            <DraftCard
              answers="dddsadusaho9fyh"
              question="isdhgiuhsduifhsdiufhioh"
              username="sd"
              avatar="/img/base-avatar.png"
              date="12.04.2004"
            />
            <DraftCard
              answers="dddsadusaho9fyh"
              question="isdhgiuhsduifhsdiufhioh"
              username="sd"
              avatar="/img/base-avatar.png"
              date="12.04.2004"
            />
            <DraftCard
              answers="dddsadusaho9fyh"
              question="isdhgiuhsduifhsdiufhioh"
              username="sd"
              avatar="/img/base-avatar.png"
              date="12.04.2004"
            />
            <DraftCard
              answers="dddsadusaho9fyh"
              question="isdhgiuhsduifhsdiufhioh"
              username="sd"
              avatar="/img/base-avatar.png"
              date="12.04.2004"
            />
            <DraftCard
              answers="dddsadusaho9fyh"
              question="isdhgiuhsduifhsdiufhioh"
              username="sd"
              avatar="/img/base-avatar.png"
              date="12.04.2004"
            />
          </div>
        </div>
        <div className={st.wrapper__cards}>
          <span className={st.text && st.span}>Вопросы:</span>
          {/* ЗДЕСЬ ДОЛЖЕН БЫТЬ ИНПУТ С ФИЛЬТРОМ ПОИСК ПО ИМЕНИ И ПО Id */}
          <div className={st.changeCategory}>
            <Btn
              dC={st.btn}
              onClick={almaz}
              type="button"
              textBtn="Измененные"
            />
            <Btn
              dC={st.btn}
              onClick={almaz}
              type="button"
              textBtn="Удаленные"
            />
          </div>
          <div className={st.card}>
            <DraftCard
              answers=""
              question="isdhgiuhsduifhsdiufhioh"
              username="sd"
              avatar="/img/base-avatar.png"
              date="12.04.2004"
            />
            <DraftCard
              answers=""
              question="isdhgiuhsduifhsdiufhioh"
              username="sd"
              avatar="/img/base-avatar.png"
              date="12.04.2004"
            />
            <DraftCard
              answers=""
              question="isdhgiuhsduifhsdiufhioh"
              username="sd"
              avatar="/img/base-avatar.png"
              date="12.04.2004"
            />
            <DraftCard
              answers=""
              question="isdhgiuhsduifhsdiufhioh"
              username="sd"
              avatar="/img/base-avatar.png"
              date="12.04.2004"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Draft;
