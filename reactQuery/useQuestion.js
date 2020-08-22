import { useQuery } from "react-query";

const useQuestion = () => {
  return useQuery("question", () =>
    fetch("/api/question").then((res) => res.json())
  );
};

export default useQuestion;
