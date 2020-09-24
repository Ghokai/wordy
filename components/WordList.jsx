import { useState } from "react";

import WordForm from "./WordForm";
import useWords from "../reactQuery/useWords";
import useDeleteWord from "../reactQuery/useDeleteWord";
import useUpdateWord from "../reactQuery/useUpdateWord";
import useSelectedWordId from "../state/useSelectedWordId";

import styles from "../styles/WordPage.module.css";

const WordListItem = ({ word }) => {
  const [deleteWord, { isLoading: isDeleteLoading }] = useDeleteWord();
  const [updateWord, { isLoading: isUpdateLoading }] = useUpdateWord();

  const [editMode, setEditMode] = useState(false);
  const [wordState, setWordState] = useState(word);

  const setSelectedWordId = useSelectedWordId(
    (state) => state.setSelectedWordId
  );

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
    <tr
      className={word._id === "temp_id" ? styles.wordLoading : ""}
      data-id={word._id}
    >
      <td>
        {editMode ? (
          <input
            value={wordState.word}
            name="word"
            onChange={onChangeHandler}
          />
        ) : (
          <a
            onClick={() => setSelectedWordId(wordState._id)}
            className={styles.wordLink}
          >
            {wordState.word}
          </a>
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
        {editMode && (
          <button onClick={updateHandler} disabled={isUpdateLoading}>
            {isUpdateLoading ? "Updating..." : "Update"}
          </button>
        )}
        {!editMode && wordState._id !== "temp_id" && (
          <button
            className={styles.editButton}
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        )}
      </td>
      <td>
        {editMode && (
          <button disabled={isUpdateLoading} onClick={cancelHandler}>
            Cancel
          </button>
        )}
        {!editMode && wordState._id !== "temp_id" && (
          <button
            disabled={isDeleteLoading}
            onClick={() => deleteWord(wordState._id)}
          >
            {isDeleteLoading ? "Deleting..." : "Delete"}
          </button>
        )}
      </td>
    </tr>
  );
};

const WordFilter = ({ filterValue, onFilterChange }) => {
  return (
    <tr>
      <td colSpan="4">
        <input
          className={styles.search}
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder="Search..."
        />
      </td>
    </tr>
  );
};

const WordList = () => {
  const [filterKey, setFilterKey] = useState("");
  const { isLoading, error, data } = useWords();
  return isLoading ? (
    <div>...</div>
  ) : error ? (
    <div>Error!</div>
  ) : (
    <table className={styles.wordTable}>
      <tbody>
        <WordForm />
        <WordFilter onFilterChange={setFilterKey} />
        {data
          .filter(
            (w) =>
              !filterKey ||
              w.word.includes(filterKey) ||
              w.turkish.includes(filterKey)
          )
          .map((w) => (
            <WordListItem key={w._id} word={w} />
          ))}
      </tbody>
    </table>
  );
};

export default WordList;
