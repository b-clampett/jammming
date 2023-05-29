import React, { useState, useEffect } from "react";
import "./App.css";
import Spotify from "../../util/Spotify";
import SearchResults from "../SearchResults/SearchResults";
import SearchBar from "../SearchBar/SearchBar";
import Playlist from "../Playlist/Playlist";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    async function handleInitialAuthorization() {
      console.log("UseEffect called for initial authorization");
      try {
        setIsloading(true);
        await Spotify._handleSpotifyCallback();
      } catch (error) {
        console.error(error);
        setErrorMessage("An Error occurred while authorizing the page");
      } finally {
        setIsloading(false);
      }
    }
    handleInitialAuthorization();
  }, []);

  async function searchAPI(trackQuery) {
    try {
      setIsloading(true);
      const response = await Spotify.search(trackQuery);
      setSearchResults(response);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "An error occurred during track search. Please try again later."
      );
    } finally {
      setIsloading(false);
    }
  }

  function handleOnChange({ target }) {
    setUserInput(target.value);
  }
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleOnClick();
    }
  }
  function handleOnClick() {
    if (!userInput) {
      return;
    }
    searchAPI(userInput);
    setUserInput("");
  }

  function handleAddTrack(track) {
    if (playlist.some((t) => track.id === t.id)) {
      return;
    }
    setPlaylist((previous) => [...previous, track]);
  }
  function handleRemoveTrack(track) {
    setPlaylist(playlist.filter((t) => track.id !== t.id));
  }

  return (
    <div className="App">
      <h1 className="h1">
        Ja<span className="span">mmm</span>ing
      </h1>
      <SearchBar
        userInput={userInput}
        handleOnChange={handleOnChange}
        handleOnClick={handleOnClick}
        handleKeyDown={handleKeyDown}
      />
      <div className="container">
        <SearchResults
          searchResults={searchResults}
          handleAddTrack={handleAddTrack}
        />
        <Playlist
          playlist={playlist}
          setPlaylist={setPlaylist}
          handleRemoveTrack={handleRemoveTrack}
        />
      </div>
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p className="error-message">Error: {errorMessage}</p>}
    </div>
  );
}

export default App;
