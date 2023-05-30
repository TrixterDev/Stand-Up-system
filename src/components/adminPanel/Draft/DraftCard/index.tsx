import st from "./style.module.sass";

interface Props {
  question: string;
  answers: string;
  username: string;
  avatar: string;
  date: string | number;
}
const DraftCard: React.FC<Props> = ({
  question,
  answers,
  username,
  avatar,
  date,
}) => {
  return (
    <div className={st.card}>
      <div className={st.card__header}>
        <img src={avatar} alt={avatar} />
        <h2 className={st.text}>{username}</h2>
      </div>
      <div className={st.card__body}>
        <div className={st.card__body__task}>
          <h2 className={st.text}>Вопрос:</h2>
          <p className={st.text && st.parag}>{question}</p>
        </div>
        <div>
          {answers ? (
            <div className={st.card__body__task}>
              <h2 className={st.text}>Ответ:</h2>
              <p className={st.text && st.parag}>{answers}</p>
            </div>
          ) : null}
        </div>
      </div>
      <div className={st.card__footer}>
        <h3 className={st.text}>{date}</h3>
      </div>
    </div>
  );
};

export default DraftCard;
