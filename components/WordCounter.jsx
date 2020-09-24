import useWords from "../reactQuery/useWords";

export default function WordCounter() {
  const { data, isLoading, isFetching } = useWords();

  if (isLoading) {
    return <div>Words Loading...</div>;
  }
  if (isFetching) {
    return <div>Words Updating...</div>;
  }

  return <div>Word Count: {data.length}</div>;
}
