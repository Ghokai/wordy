import { queryCache } from "react-query";
import { useState, useEffect } from "react";
import styles from "../styles/Question.module.css";

const QuestionItem = ({ question }) => {
  const [selection, setSelection] = useState("");

  useEffect(() => {
    setSelection("");
  }, [setSelection, question]);

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
              onClick={() => setSelection(o.id)}
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
