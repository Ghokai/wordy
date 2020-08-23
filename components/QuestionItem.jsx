import { queryCache } from "react-query";
import { useState, useEffect } from "react";
import styles from "../styles/Question.module.css";
import useQuizState from "../state/useQuizState";

const QuestionItem = ({ question }) => {
  const [selection, setSelection] = useState("");

  const { questionAnswered, questionNotAnswered } = useQuizState((state) => ({
    questionAnswered: state.questionAnswered,
    questionNotAnswered: state.questionNotAnswered,
  }));

  useEffect(() => {
    setSelection("");
  }, [setSelection, question]);

  const answerQuestion = (choice) => {
    if (selection === "") {
      if (choice === question.answer) {
        questionAnswered();
      } else {
        questionNotAnswered();
      }
    }
    setSelection(choice);
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
        <button
          className={styles.nextQuestion}
          onClick={() => queryCache.invalidateQueries("question")}
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default QuestionItem;
