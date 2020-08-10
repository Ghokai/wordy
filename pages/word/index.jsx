import { useQuery, useMutation, queryCache } from "react-query";
import { useState } from "react";
import Router from "next/router";

export const useWords = () => {
  return useQuery("words", () => fetch("/api/word").then((res) => res.json()));
};

const useDeleteWord = () => {
  return useMutation(
    async (id) => {
      const res = await fetch("/api/word/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      if (res.ok) {
        return result;
      }
      throw result;
    },
    {
      throwOnError: true,
      onSuccess: (data, variables) => {
        console.log("on delete success");
        console.log(data);
        console.log(variables);
        queryCache.setQueryData("words", (old) =>
          old.filter((w) => w._id !== variables)
        );
      },
    }
  );
};

const useSaveWord = () => {
  return useMutation(
    async (word) => {
      const res = await fetch("/api/word", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(word),
      });

      const result = await res.json();
      if (res.ok) {
        return result;
      }
      throw result;
    },
    {
      throwOnError: true,
      // When mutate is called:
      onMutate: (newWord) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        queryCache.cancelQueries("words");

        // Snapshot the previous value
        const previousWords = queryCache.getQueryData("words");
        const obj = { ...newWord, _id: "" };
        // Optimistically update to the new value
        queryCache.setQueryData("words", (old) => [obj, ...old]);

        // Return the snapshotted value
        return () => queryCache.setQueryData("words", previousWords);
      },
      // If the mutation fails, use the value returned from onMutate to roll back
      onError: (err, newWord, rollback) => {
        console.log("on error");
        console.log(err);
        rollback();
        return err;
      },
      // Always refetch after error or success:
      onSettled: () => {
        // queryCache.invalidateQueries("words");
      },
      onSuccess: (data, variables) => {
        console.log("on success");
        const previousWords = queryCache.getQueryData("words");
        queryCache.setQueryData("words", [
          data,
          ...previousWords.filter((w) => w._id !== ""),
        ]);
      },
    }
  );
};

const initialWord = { word: "", turkish: "" };
const WordForm = () => {
  const [word, setWord] = useState({ ...initialWord });
  const [mutate, { isLoading }] = useSaveWord();

  const onChangeHandler = (e) => {
    setWord({ ...word, [e.target.name]: e.target.value });
  };

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

const WordListItem = ({ word }) => {
  const [mutate, { isLoading }] = useDeleteWord();
  return (
    <div>
      {word.word} - {word.turkish} -{" "}
      <button disabled={isLoading} onClick={() => mutate(word._id)}>
        {isLoading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

const WordList = () => {
  const { isLoading, error, data } = useWords();
  return isLoading ? (
    <div>loading</div>
  ) : error ? (
    <div>Error!</div>
  ) : (
    <div>
      {data.map((w) => (
        <WordListItem key={w._id} word={w} />
      ))}
    </div>
  );
};

export default function Index() {
  return (
    <>
      <WordForm></WordForm>
      <WordList></WordList>
      <div>
        <button onClick={() => Router.push("/question")}>
          Go to Questions
        </button>
      </div>
    </>
  );
}
