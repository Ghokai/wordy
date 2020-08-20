import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [session, loading] = useSession();

  console.log(session);

  return (
    <div className={styles.container}>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </div>
  );
}
