import React from "react";
import "./SearchBar.css";

function SearchBar({
  userInput,
  handleOnChange,
  handleOnClick,
  handleKeyDown,
}) {
  return (
    <div className="SearchBar">
      <input
        className="input"
        placeholder="Enter A Song Title "
        value={userInput}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <button className="button" onClick={handleOnClick}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
