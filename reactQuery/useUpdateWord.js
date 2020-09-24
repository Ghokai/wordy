import { useMutation, queryCache } from "react-query";

const useUpdateWord = () => {
  return useMutation(
    async (word) => {
      const res = await fetch("/api/word/" + word._id, {
        method: "PUT",
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
      //throwOnError: true,
      onSuccess: (response, word) => {
        queryCache.setQueryData("words", (old) =>
          old.map((w) => (w._id === word._id ? word : w))
        );
        // queryCache.invalidateQueries("words", { exact: true });

        //  queryCache.invalidateQueries(["words", word._id], { exact: true });
        queryCache.setQueryData(["words", word._id], word);
      },
    }
  );
};
export default useUpdateWord;
