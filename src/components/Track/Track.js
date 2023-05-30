import React from "react";
import "./Track.css";

function Track({ track, handleAddTrack, handleRemoveTrack }) {
  const button = handleAddTrack ? (
    <button className="trackButton" onClick={() => handleAddTrack(track)}>
      +
    </button>
  ) : (
    <button className="trackButton" onClick={() => handleRemoveTrack(track)}>
      &minus;
    </button>
  );
  return (
    <div className="Track">
      <div className="container1">
        <div className="container2">
          <h3 className="h3Track">{track.name}</h3>
          <p className="pTrack">
            {track.artist} | {track.album}{" "}
          </p>
          <br />
          <audio className="audio" controls>
            <source src={track.preview} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        {button}
      </div>
      <br />
      <hr />
      <br />
    </div>
  );
}

export default Track;
