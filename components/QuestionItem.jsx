import { queryCache } from "react-query";
import { useState, useEffect } from "react";
import styles from "../styles/Question.module.css";
import useQuizState from "../state/useQuizState";
import useQuestionHistory from "../state/useQuestionHistory";

const QuestionItem = ({ question }) => {
  const [selection, setSelection] = useState("");
  const [answer, setAnswer] = useState(null);

  const { questionAnswered, questionNotAnswered } = useQuizState((state) => ({
    questionAnswered: state.questionAnswered,
    questionNotAnswered: state.questionNotAnswered,
  }));

  const addToQuestionHistory = useQuestionHistory(
    (state) => state.addToHistory
  );

  useEffect(() => {
    setSelection("");
    setAnswer(null);
  }, [setSelection, question]);

  const answerQuestion = (choice) => {
    if (selection === question.answer) {
      return;
    }
    if (selection === "") {
      if (choice === question.answer) {
        questionAnswered();
        setAnswer(true);
      } else {
        questionNotAnswered();
        setAnswer(false);
      }
    }
    setSelection(choice);
  };

  const getNextQuestion = () => {
    addToQuestionHistory({ word: question.word, answer });
    queryCache.invalidateQueries("question");
  };

  return (
    <div className={styles.questionItem}>
      <div>
        <span>{question.word}</span>
        <hr />
      </div>
      <div>
        <ul>
          {question.options.map((o) => (
            <li
              key={o.id}
              onClick={() => answerQuestion(o.id)}
              className={
                selection === question.answer && selection === o.id
                  ? styles.correct
                  : selection &&
                    selection !== question.answer &&
                    selection === o.id
                  ? styles.wrong
                  : ""
              }
            >
              {o.turkish}
            </li>
          ))}
        </ul>
      </div>
      {selection === question.answer && (
        <button className={styles.nextQuestion} onClick={getNextQuestion}>
          Next Question
        </button>
      )}
    </div>
  );
};

export default QuestionItem;
