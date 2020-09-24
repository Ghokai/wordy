import React from "react";
import { queryCache } from "react-query";

const FetchWords = () => {
  return (
    <button
      onClick={() => {
        queryCache.invalidateQueries("words", { exact: true });
      }}
    >
      Refresh List
    </button>
  );
};

export default FetchWords;
