import React from "react";
import spinner from "../../images/spinner.gif";
import "./SearchResults.css";
import TrackList from "../Tracklist/Tracklist";

function SearchResults({ searchResults, handleAddTrack, isLoading }) {
  return (
    <div className="SearchResultsContainer">
      {isLoading && <div className="overlay"></div>}
      <div className="SearchResults">
        <h1 className="h1Results">Results</h1>
        <div className="tracklistContainer">
          {isLoading && (
            <div className="loadingSpinner">
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
