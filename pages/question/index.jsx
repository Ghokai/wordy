import styles from "../../styles/Question.module.css";
import QuestionItem from "../../components/QuestionItem";
import useQuestion from "../../reactQuery/useQuestion";
import QuizScore from "../../components/QuizScore";

export default function Index() {
  const { isLoading, data } = useQuestion();

  //isFetching
  return (
    <div className={styles.questionWrapper}>
      {isLoading ? <div>Question Retrieving...</div> : <QuizScore></QuizScore>}
      {data && <QuestionItem question={data} />}
    </div>
  );
}
