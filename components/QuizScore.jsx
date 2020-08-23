import React from "react";
import shallow from "zustand/shallow";
import useQuizState from "../state/useQuizState";
import styles from "../styles/Question.module.css";

export default function QuizScore() {
  const quizScore = useQuizState(
    (state) => ({ successful: state.successful, failed: state.failed }),
    shallow
  );
  return (
    <div className={styles.quizScore}>
      <div className={styles.successful}>
        Successful: {quizScore.successful}
      </div>
      <div className={styles.failed}>Failed: {quizScore.failed}</div>
    </div>
  );
}
