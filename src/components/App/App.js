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
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await Spotify.search(trackQuery);
      response.map((track) => (track.userInput = trackQuery));
      const filteredResults = response.filter(
        (track) => !playlist.some((plTrack) => plTrack.id === track.id)
      );
      setSearchResults(filteredResults);
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
    setPlaylist((previous) => [...previous, track]);
    setSearchResults(searchResults.filter((t) => track.id !== t.id));
  }
  function handleRemoveTrack(track) {
    setPlaylist(playlist.filter((t) => track.id !== t.id));
    const userInputWords = track.userInput.split(" ");
    if (
      !userInputWords.some((word) => searchResults[0].userInput.includes(word))
    ) {
      return;
    }
    const updatedSearchResults = [...searchResults];
    updatedSearchResults.splice(track.index, 0, track);
    setSearchResults(updatedSearchResults);
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
          isLoading={isLoading}
        />
        <Playlist
          playlist={playlist}
          setPlaylist={setPlaylist}
          handleRemoveTrack={handleRemoveTrack}
        />
      </div>
      {errorMessage && <p className="error-message">Error: {errorMessage}</p>}
    </div>
  );
}

export default App;
