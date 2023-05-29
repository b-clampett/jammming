import React from "react";
import "./SearchResults.css";
import TrackList from "../Tracklist/Tracklist";

function SearchResults({ searchResults, handleAddTrack }) {
  return (
    <div className="SearchResultsContainer">
      <div className="SearchResults">
        <h1 className="h1Results">Results</h1>
        <div className="tracklistContainer">
          <TrackList tracks={searchResults} handleAddTrack={handleAddTrack} />
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
