import "../styles/globals.css";
import {
  ReactQueryCacheProvider,
  ReactQueryConfigProvider,
  makeQueryCache,
} from "react-query";
import Header from "../components/Header";
import Head from "next/head";

const queryCache = makeQueryCache();

function MyApp({ Component, pageProps }) {
  return (
    // <ReactQueryCacheProvider queryCache={queryCache}>
    <ReactQueryConfigProvider
      config={{ queries: { refetchOnWindowFocus: false } }}
    >
      <Head>
        <title>Wordy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </ReactQueryConfigProvider>
    // </ReactQueryCacheProvider>
  );
}

export default MyApp;
