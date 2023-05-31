import React, { useState } from "react";
import spinner from "../../images/spinner.gif";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";
import Spotify from "../../util/Spotify";

function Playlist({ playlist, setPlaylist, handleRemoveTrack }) {
  const [playlistName, setPlaylistName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleNameChange({ target }) {
    setPlaylistName(target.value);
  }

  async function savePlaylist(uris) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if (uris.length > 0) {
      try {
        await Spotify.handleSavePlaylist(uris, playlistName);
        alert("Playlist saved successfully!");
      } catch (error) {
        console.error(error);
        alert(
          "An error occurred while saving the playlist. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    }
  }
  async function handleSubmit(event) {
    try {
      setIsLoading(true);
      event.preventDefault();
      if (!playlist.length) {
        return;
      }
      if (!playlistName) {
        alert("Please enter a Playlist name");
        return;
      }
      const uris = playlist.map((track) => track.uri);
      setPlaylist([]);
      setPlaylistName("");
      await savePlaylist(uris);
    } catch (error) {
      console.error(error);
      throw new Error(
        "Error Saving Playlist to Spotify. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      {isLoading && <div className="overlay"></div>}
      <form className="Playlist" onSubmit={handleSubmit}>
        <input
          className="inputPlaylist"
          style={{ border: "none" }}
          placeholder="New Playlist"
          value={playlistName}
          onChange={handleNameChange}
        />
        <hr className="hr" />
        <div className="playlistContainer">
          <Tracklist tracks={playlist} handleRemoveTrack={handleRemoveTrack} />
          <button className="button btnPlaylist" type="submit">
            Save To Spotify
          </button>
          <br />
          {isLoading && (
            <img
              className="loadingSpinner"
              src={spinner}
              alt="...Loading"
              height="64"
              width="64"
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default Playlist;
