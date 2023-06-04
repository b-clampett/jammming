import React from "react";
import spinner from "../../images/spinner.gif";
import styles from "./SearchResults.module.css";
import TrackList from "../Tracklist/Tracklist";

function SearchResults({ searchResults, handleAddTrack, isLoading }) {
  return (
    <div className={styles.SearchResultsContainer}>
      {isLoading && <div className={styles.overlay}></div>}
      <div className={styles.SearchResults}>
        <h1 className={styles.h1Results}>Results</h1>
        <div className={styles.tracklistContainer}>
          {isLoading && (
            <div className={styles.loadingSpinner}>
              <img src={spinner} alt="...Loading" height="64" width="64" />
            </div>
          )}
          <TrackList tracks={searchResults} handleAddTrack={handleAddTrack} />
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
