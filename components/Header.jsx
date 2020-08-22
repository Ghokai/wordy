import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";
import styles from "../styles/Header.module.css";

export default function Header() {
  const [session, loading] = useSession();

  return (
    <div className={styles.header}>
      <div>
        <span className={styles.brand}>
          <Link href="/">
            <a>Wordy App</a>
          </Link>
        </span>
        <ul>
          <li>
            <Link href="/word">
              <a>Dictionary</a>
            </Link>
          </li>
          <li>
            <Link href="/question">
              <a>Quiz</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.rightHeader}>
        {!session && (
          <span className={styles.btn} onClick={signIn}>
            Sign In
          </span>
        )}
        {session && (
          <>
            <span className={styles.btn} onClick={signOut}>
              Sign Out
            </span>
          </>
        )}
      </div>
    </div>
  );
}
