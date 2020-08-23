import { useEffect } from "react";
import { queryCache } from "react-query";
import styles from "../../styles/Question.module.css";
import QuestionItem from "../../components/QuestionItem";
import useQuestion from "../../reactQuery/useQuestion";
import QuizScore from "../../components/QuizScore";
import QuestionHistoryFeed from "../../components/QuestionHistoryFeed";
import useQuestionHistory from "../../state/useQuestionHistory";

export default function Index() {
  const previousQuestions = useQuestionHistory((state) =>
    state.history.map((w) => w.word)
  );
  const { isLoading, data } = useQuestion();

  useEffect(() => {
    if (data && previousQuestions.includes(data.word)) {
      queryCache.invalidateQueries("question");
    }
  }, [data]);

  //isFetching
  return (
    <>
      <QuestionHistoryFeed></QuestionHistoryFeed>
      <div className={styles.questionWrapper}>
        {isLoading ? (
          <div>Question Retrieving...</div>
        ) : (
          <QuizScore></QuizScore>
        )}
        {data && <QuestionItem question={data} />}
      </div>
    </>
  );
}
