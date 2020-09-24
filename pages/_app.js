import "../styles/globals.css";

import {
  ReactQueryCacheProvider,
  ReactQueryConfigProvider,
  makeQueryCache,
} from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

import Header from "../components/Header";
import Head from "next/head";

const queryCache = makeQueryCache();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ReactQueryConfigProvider
        config={{ queries: { refetchOnWindowFocus: false } }}
      >
        <Head>
          <title>Wordy</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Header />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryConfigProvider>
    </>
  );
}

export default MyApp;
