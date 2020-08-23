import React from "react";
import { useSession } from "next-auth/client";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [session, loading] = useSession();

  console.log(session);

  return (
    <div className={styles.container}>
      <h1>Wordy App</h1>
    </div>
  );
}
