import { useState } from "react";
import WordForm from "./WordForm";
import useWords from "../reactQuery/useWords";
import useDeleteWord from "../reactQuery/useDeleteWord";
import useUpdateWord from "../reactQuery/useUpdateWord";

import styles from "../styles/WordPage.module.css";

const WordListItem = ({ word }) => {
  const [deleteWord, { isLoading }] = useDeleteWord();
  const [updateWord, { isLoading: isUpdateLoading }] = useUpdateWord();

  const [editMode, setEditMode] = useState(false);
  const [wordState, setWordState] = useState(word);

  const onChangeHandler = (e) => {
    const name = event.target.name;
    const value = event.target.value;
    setWordState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateHandler = async () => {
    await updateWord(wordState);
    setEditMode(false);
  };

  const cancelHandler = () => {
    setWordState(word);
    setEditMode(false);
  };

  return (
    <tr className={word._id === "" ? styles.wordLoading : ""}>
      <td>
        {editMode ? (
          <input
            value={wordState.word}
            name="word"
            onChange={onChangeHandler}
          />
        ) : (
          <span>{wordState.word}</span>
        )}
      </td>
      <td>
        {editMode ? (
          <input
            value={wordState.turkish}
            name="turkish"
            onChange={onChangeHandler}
          />
        ) : (
          <span>{wordState.turkish}</span>
        )}
      </td>
      <td>
        {editMode && <button onClick={updateHandler}>Update</button>}
        {!editMode && wordState._id !== "" && (
          <button
            className={styles.editButton}
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        )}
      </td>
      <td>
        {editMode && <button onClick={cancelHandler}>Cancel</button>}
        {!editMode && wordState._id !== "" && (
          <button
            disabled={isLoading}
            onClick={() => deleteWord(wordState._id)}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        )}
      </td>
    </tr>
  );
};

const WordList = () => {
  const { isLoading, error, data } = useWords();
  return isLoading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>Error!</div>
  ) : (
    <table className={styles.wordTable}>
      <tbody>
        <WordForm />
        {data.map((w) => (
          <WordListItem key={w._id} word={w} />
        ))}
      </tbody>
    </table>
  );
};

export default WordList;
