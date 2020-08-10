import "../styles/globals.css";
import {
  ReactQueryCacheProvider,
  ReactQueryConfigProvider,
  makeQueryCache,
} from "react-query";

const queryCache = makeQueryCache();

function MyApp({ Component, pageProps }) {
  return (
    // <ReactQueryCacheProvider queryCache={queryCache}>
    <ReactQueryConfigProvider
      config={{ queries: { refetchOnWindowFocus: false } }}
    >
      <Component {...pageProps} />
    </ReactQueryConfigProvider>
    // </ReactQueryCacheProvider>
  );
}

export default MyApp;
