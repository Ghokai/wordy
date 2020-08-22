import styles from "../../styles/WordPage.module.css";
import WordList from "../../components/WordList";

export default function Index() {
  return (
    <div className={styles.container}>
      {/* <div className={styles.loader}>
        <div className={styles.bar}></div>
      </div> */}
      <WordList></WordList>
    </div>
  );
}
