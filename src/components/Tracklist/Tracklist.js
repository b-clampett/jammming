import React from "react";
import "./Tracklist.css";
import Track from "../Track/Track";

function Tracklist({ tracks, handleAddTrack, handleRemoveTrack }) {
  const tracklist = tracks.map((track) => {
    if (handleAddTrack) {
      return (
        <li key={track.id}>
          <Track track={track} handleAddTrack={handleAddTrack} />{" "}
        </li>
      );
    }
    return (
      <li key={track.id}>
        <Track track={track} handleRemoveTrack={handleRemoveTrack} />{" "}
      </li>
    );
  });
  return <ul className="ulTracklist">{tracklist}</ul>;
}

export default Tracklist;
