import { useQuery, useMutation, queryCache } from "react-query";
import Router from "next/router";
import { useState, useEffect } from "react";

export const useQuestion = () => {
  return useQuery("question", () =>
    fetch("/api/question").then((res) => res.json())
  );
};

const QuestionItem = ({ question }) => {
  const [selection, setSelection] = useState("");
  useEffect(() => {
    setSelection("");
  }, [question]);
  return (
    <div>
      <div>{question.word}</div>
      <div>
        <ul>
          {question.options.map((o) => (
            <li onClick={() => setSelection(o.id)}>
              {o.turkish}
              {selection === question.answer &&
                selection === o.id &&
                "-CORRECT"}
              {selection &&
                selection !== question.answer &&
                selection === o.id &&
                "-WRONG"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function Index() {
  const { isLoading, data } = useQuestion();

  console.log(data);

  return (
    <div>
      <div>
        {data && <QuestionItem question={data} />}
        <button onClick={() => queryCache.invalidateQueries("question")}>
          Next Question
        </button>

        <button onClick={() => Router.push("/word")}>Go to Words</button>
      </div>
    </div>
  );
}
