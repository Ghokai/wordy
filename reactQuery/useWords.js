import { useQuery } from "react-query";

const useWords = () => {
  return useQuery("words", async () => {
    const response = await fetch("/api/word");
    const json = await response.json();
    return json;
  });
};

export default useWords;
