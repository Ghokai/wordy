import { useQuery } from "react-query";

const useWord = (id) => {
  return useQuery(
    ["words", id],
    async (key, id) => {
      try {
        const response = await fetch("/api/word/" + id);
        const json = await response.json();

        return json;
      } catch (error) {
        return null;
      }
    },
    { enabled: !!id }
  );
};

export default useWord;
