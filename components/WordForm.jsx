import { useState } from "react";
import useCreateWord from "../reactQuery/useCreateWord";
import styles from "../styles/WordPage.module.css";

const initialWord = { word: "", turkish: "" };
const WordForm = () => {
  const [word, setWord] = useState({ ...initialWord });
  const [mutate, { isLoading, error }] = useCreateWord();

  const onChangeHandler = (e) => {
    setWord({ ...word, [e.target.name]: e.target.value });
  };

  const saveHandler = async () => {
    // console.log(word);
    try {
      await mutate(word);
      setWord({ ...initialWord });
    } catch (error) {
      // console.log(error);
      // reset();
    }
  };

  return (
    <>
      <tr>
        <td>
          <input
            type="text"
            value={word.word}
            name="word"
            onChange={onChangeHandler}
            placeholder="Word"
          />
        </td>
        <td>
          <input
            type="text"
            value={word.turkish}
            name="turkish"
            onChange={onChangeHandler}
            placeholder="Meaning"
          />
        </td>
        <td colSpan="2">
          <button disabled={isLoading} onClick={saveHandler}>
            {isLoading ? "Adding..." : "Add"}
          </button>
        </td>
      </tr>
      {error && (
        <tr className={styles.loader}>
          <td colSpan="4">{error.error}</td>
        </tr>
      )}
    </>
  );
};

export default WordForm;
