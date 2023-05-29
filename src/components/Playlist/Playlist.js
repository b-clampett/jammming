import React, { useState } from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";
import Spotify from "../../util/Spotify";

function Playlist({ playlist, setPlaylist, handleRemoveTrack }) {
  const [playlistName, setPlaylistName] = useState("");

  function handleNameChange({ target }) {
    setPlaylistName(target.value);
  }

  async function savePlaylist(uris) {
    if (uris.length > 0) {
      try {
        await Spotify.handleSavePlaylist(uris, playlistName);
        alert("Playlist saved successfully!");
      } catch (error) {
        console.error(error);
        alert(
          "An error occurred while saving the playlist. Please try again later."
        );
      }
    }
  }
  async function handleSubmit(event) {
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
  }
  return (
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
      </div>
    </form>
  );
}

export default Playlist;
