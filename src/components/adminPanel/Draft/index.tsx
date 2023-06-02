import { useEffect, useState } from "react";
import { getUsers } from "../../../api";
import Btn from "../../ui/Btn/Btn";
import DraftCard from "./DraftCard";
import st from "./style.module.sass";
import clsx from "clsx";
const Draft = () => {
  const [users, setUsers] = useState<any>({
    username: "",
    avatar: "",
  });
  const [question, setQuestion] = useState<any>([]);
  const [answers, setAnswers] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<"answers" | "questions">(
    "answers"
  );
  useEffect(() => {
    getUsers().then((res: any) => {
      console.log(res.data);
      setUsers(res);
    });
  }, []);
  return (
    <section className={st.container}>
      <h2 className={st.text}>Архив ответов и вопросов</h2>
      <div className={st.header}>
        <div className="tabs">
          <button
            className={clsx("tab", activeTab === "answers" && "active")}
            onClick={() => setActiveTab("answers")}
          >
            Ответы
          </button>
          <button
            className={clsx("tab", activeTab === "questions" && "active")}
            onClick={() => setActiveTab("questions")}
          >
            Вопросы
          </button>
        </div>
      </div>

      {activeTab === "answers" ? (
        <div className={st["draft-content"]}>
          <div className={st["filters"]}>
            <div className={st["filter-tabs"]}>
              <button>Все</button>
              <button>Удалённые</button>
              <button>Изменённые</button>
            </div>

            <div className={st["search-wrap"]}>
              <label>
                <input type="text" placeholder="Поиск ответа" />
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className={st["draft-content"]}>
          <h4>Архив вопросов</h4>
        </div>
      )}
    </section>
  );
};

export default Draft;
