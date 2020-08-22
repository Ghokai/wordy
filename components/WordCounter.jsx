import useWords from "../reactQuery/useWords";

export default function WordCounter() {
  const { data, isLoading } = useWords();

  if (isLoading) {
    return <div>Words Loading...</div>;
  }
  return <div>Word Count: {data.length}</div>;
}
