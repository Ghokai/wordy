// import { useQuery, useMutation, queryCache } from "react-query";
// import { useState } from "react";
import Router from "next/router";
import styles from "../../styles/WordPage.module.css";
import WordList from "../../components/WordList";
import WordForm from "../../components/WordForm";

export default function Index() {
  return (
    <div className={styles.container}>
      <WordForm></WordForm>
      <WordList></WordList>
      <div>
        <button onClick={() => Router.push("/question")}>
          Go to Questions
        </button>
      </div>
    </div>
  );
}
