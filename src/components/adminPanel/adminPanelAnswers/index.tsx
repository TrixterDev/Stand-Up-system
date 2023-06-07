import { useEffect, useState } from "react";
import { getAnswers } from "../../../api";
import DraftCard from "./AnswersCard";
import styles from "./style.module.sass";
import { Loader } from "../../ui/Loader";
import clsx from "clsx";

const PanelAnswer = () => {
  const [answers, setAnswers] = useState<any[]>();
  const [username, setUsername] = useState<string>("");
  const [filteredAnswers, setFilteredAnswers] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    getAnswers()
      .then((res: any) => {
        setAnswers(res.data);
        setFilteredAnswers(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (username) {
      const filtered = answers.filter((data: any) =>
        data.attributes?.users?.data?.attributes?.username
          ?.toLowerCase()
          .includes(username.toLowerCase())
      );
      setFilteredAnswers(filtered);
    } else {
      setFilteredAnswers(answers);
    }
  }, [username, answers]);

  return (
    <section className={styles.answers}>
      <div className={styles.answers__title}>
        <h2>Ответы от пользователей</h2>
        {loading && (
          <div
            className={clsx(styles["loader-wrap"], loading && styles.active)}
          >
            <Loader />
          </div>
        )}
      </div>
      <div className={styles.answers__cont}>
        <h2>Вы можете найти ответ по пользователю</h2>
        <input
          className={styles.input}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
      </div>
      <div className={styles.answers__cards}>
        {filteredAnswers &&
          filteredAnswers.map((data: any, index: number) => {
            return (
              <DraftCard
                key={index}
                date={data.attributes?.createdAt}
                username={data.attributes?.users?.data?.attributes?.username}
                answers={data.attributes?.answer}
                avatar={
                  data.attributes?.users?.data?.attributes?.avatarka?.data
                    ?.attributes?.url || "/img/base-avatar.png"
                }
                category={
                  data.attributes?.category?.data?.attributes?.category_name
                }
                question={data.attributes?.question?.data?.attributes?.title}
              />
            );
          })}
      </div>
    </section>
  );
};

export default PanelAnswer;
