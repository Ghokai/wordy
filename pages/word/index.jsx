import styles from "../../styles/WordPage.module.css";
import WordList from "../../components/WordList";
import WordCounter from "../../components/WordCounter";
import FetchWords from "../../components/FetchWords";
import WordDetails from "../../components/WordDetails";

export default function Index() {
  return (
    <div className={styles.container}>
      <WordDetails></WordDetails>
      <FetchWords></FetchWords>
      <WordCounter></WordCounter>
      <WordList></WordList>
    </div>
  );
}
