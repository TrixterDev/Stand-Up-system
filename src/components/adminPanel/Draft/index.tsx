import { ChangeEvent, useEffect, useState } from "react";
import {
  getAnswers,
  getAnswersById,
  getAnswersByTitle,
  getAnswersByUser,
  getUsers,
} from "../../../api";
import Btn from "../../ui/Btn/Btn";
import st from "./style.module.sass";
import clsx from "clsx";
import { DraftCard } from "./DraftCard";
import { format, parseISO } from "date-fns";

const ArchivePage = () => {
  const [users, setUsers] = useState<any>({
    username: "",
    avatar: "",
  });
  const [question, setQuestion] = useState<any>([]);
  const [answers, setAnswers] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<"answers" | "questions">(
    "answers"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<
    "id" | "name" | "user" | "date"
  >();
  const [autoCompleteData, setAutoCompleteData] = useState<string[]>([]);
  const [time, setTime] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (selectedFilter === "id") {
          response = await getAnswers();
          setAutoCompleteData(() =>
            response.data.map((item: { id: number }) => item.id.toString())
          );
        } else if (selectedFilter === "name") {
          response = await getAnswers();
          setAutoCompleteData(
            response.data.reduce((acc, item) => {
              if (time) {
                if (
                  format(parseISO(item.attributes.createdAt), "yyyy-MM-dd") ===
                  time
                ) {
                  acc.push(item.attributes.answer);
                }
              } else {
                acc.push(item.attributes.answer);
              }
              return acc;
            }, [])
          );
        } else if (selectedFilter === "user") {
          response = await getUsers();
          setAutoCompleteData(() =>
            response.map((item: { username: string }) => item.username)
          );
        } else if (selectedFilter === "date") {
          // Use the appropriate API method for fetching answers by date
          response = await getAnswersByDate(time);
          setAutoCompleteData(() =>
            response.data.map(
              (item: { attributes: { answer: string } }) =>
                item.attributes.answer
            )
          );
        }

        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [selectedFilter, time]);

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value as any);
  };

  const search = () => {
    if (selectedFilter === "user") {
      getAnswersByUser(searchQuery).then((resp) => {
        setAnswers(resp.data);
        console.log(resp.data);
      });
    } else if (selectedFilter === "id") {
      getAnswersById(searchQuery).then((resp) => setAnswers(resp.data));
    } else if (selectedFilter === "name") {
      getAnswersByTitle(searchQuery).then((resp) => setAnswers(resp.data));
    }
  };

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
            <div className={st["search-wrap"]}>
              <label>
                <input
                  type="text"
                  placeholder="Поиск ответа"
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                  list="autoCompleteList"
                />
              </label>
              <datalist id="autoCompleteList">
                {autoCompleteData.map((item, index) => (
                  <option key={index} value={item} />
                ))}
              </datalist>
              <select value={selectedFilter} onChange={handleFilterChange}>
                <option value="id">По ID</option>
                <option value="name">По названию</option>
                <option value="user">По пользователю</option>
                <option value="date">По дате</option>
              </select>
              <input
                type="date"
                name="date"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTime(e.target.value)
                }
              />
              <button onClick={search}>Поиск</button>
            </div>
          </div>

          <div className={st.cards}>
            {answers.map((item: { attributes: { answer: string } }) => (
              <DraftCard title={item.attributes.answer} key={item.id} />
            ))}
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

export default ArchivePage;
