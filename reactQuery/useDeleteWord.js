import { useMutation, queryCache } from "react-query";

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
export default useDeleteWord;
