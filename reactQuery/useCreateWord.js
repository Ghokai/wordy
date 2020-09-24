import { useMutation, queryCache } from "react-query";

const useCreateWord = () => {
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
      //throwOnError: true,
      // When mutate is called:
      onMutate: (newWord) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        queryCache.cancelQueries("words");

        // Snapshot the previous value
        const previousWords = queryCache.getQueryData("words");
        const obj = { ...newWord, _id: "temp_id" };
        // Optimistically update to the new value
        queryCache.setQueryData("words", (old) => [obj, ...old]);

        // Return the snapshotted value
        return () => queryCache.setQueryData("words", previousWords);
      },
      // If the mutation fails, use the value returned from onMutate to roll back
      onError: (err, newWord, rollback) => {
        rollback();
        return err;
      },
      // Always refetch after error or success:
      onSettled: () => {
        // queryCache.invalidateQueries("words", { exact: true });
        // queryCache.refetchQueries("words", { exact: true });
      },
      onSuccess: (data, variables) => {
        const words = queryCache.getQueryData("words");
        queryCache.setQueryData("words", [
          data,
          ...words.filter((w) => w._id !== "temp_id"),
        ]);

        // queryCache.refetchQueries("words", { exact: true });
      },
    }
  );
};

export default useCreateWord;
