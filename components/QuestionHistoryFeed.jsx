import styles from "../styles/Question.module.css";
import useQuestionHistory from "../state/useQuestionHistory";

const QuestionHistoryFeed = () => {
  const questionHistory = useQuestionHistory((state) => state.history);

  return (
    <div className={styles.questionFeed}>
      <ul>
        {questionHistory.map((w, index) => (
          <li key={index} className={w.answer ? styles.correct : styles.wrong}>
            <span>{w.word}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionHistoryFeed;
