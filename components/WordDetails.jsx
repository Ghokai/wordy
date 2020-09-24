import React from "react";
import useSelectedWordId from "../state/useSelectedWordId";
import useWord from "../reactQuery/useWord";
import styles from "../styles/WordPage.module.css";

const WordDetails = () => {
  const selectedWordId = useSelectedWordId((state) => state.selectedWordId);
  const { data, isLoading, isFetching } = useWord(selectedWordId);
  return (
    <div className={styles.wordDetails}>
      {isLoading && <p>Loading...</p>}
      {!isLoading && isFetching && <p>Fetching...</p>}
      {!isLoading && !isFetching && data && <p>Loaded</p>}
      {data && (
        <div>
          <p>Details: {data._id}</p>
          <p>
            {data.word} - {data.turkish}
          </p>
        </div>
      )}
    </div>
  );
};

export default WordDetails;
