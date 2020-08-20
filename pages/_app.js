import "../styles/globals.css";
import {
  ReactQueryCacheProvider,
  ReactQueryConfigProvider,
  makeQueryCache,
} from "react-query";
import Header from "../components/Header";

const queryCache = makeQueryCache();

function MyApp({ Component, pageProps }) {
  return (
    // <ReactQueryCacheProvider queryCache={queryCache}>
    <ReactQueryConfigProvider
      config={{ queries: { refetchOnWindowFocus: false } }}
    >
      <Header />
      <Component {...pageProps} />
    </ReactQueryConfigProvider>
    // </ReactQueryCacheProvider>
  );
}

export default MyApp;
