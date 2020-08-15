import { useState } from "react";
import useSaveWord from "../reactQuery/useSaveWord";

const initialWord = { word: "", turkish: "" };
const WordForm = () => {
  const [word, setWord] = useState({ ...initialWord });
  const [mutate, { isLoading, error }] = useSaveWord();

  const onChangeHandler = (e) => {
    setWord({ ...word, [e.target.name]: e.target.value });
  };

  console.log(error);

  const saveHandler = async () => {
    console.log(word);
    try {
      await mutate(word);
      setWord({ ...initialWord });
    } catch (error) {
      console.log(error);
      // reset();
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={word.word}
          name="word"
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <input
          type="text"
          value={word.turkish}
          name="turkish"
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <button disabled={isLoading} onClick={saveHandler}>
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default WordForm;
