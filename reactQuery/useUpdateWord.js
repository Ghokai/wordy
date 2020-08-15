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
      throwOnError: true,
      onSuccess: (data, variables) => {
        queryCache.setQueryData("words", (old) =>
          old.map((w) => (w._id === variables._id ? variables : w))
        );
      },
    }
  );
};
export default useUpdateWord;
