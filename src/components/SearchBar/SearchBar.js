import React from "react";
import styles from "./SearchBar.module.css";

function SearchBar({
  userInput,
  handleOnChange,
  handleOnClick,
  handleKeyDown,
}) {
  return (
    <div className={styles.SearchBar}>
      <input
        className={styles.input}
        placeholder="Enter A Song Title "
        value={userInput}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.button} onClick={handleOnClick}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
