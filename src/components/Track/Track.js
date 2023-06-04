import React from "react";
import styles from "./Track.module.css";

function Track({ track, handleAddTrack, handleRemoveTrack }) {
  const button = handleAddTrack ? (
    <button className={styles.trackButton} onClick={() => handleAddTrack(track)}>
      +
    </button>
  ) : (
    <button className={styles.trackButton} onClick={() => handleRemoveTrack(track)}>
      &minus;
    </button>
  );
  return (
    <div className={styles.Track}>
      <div className= {styles.container1}>
        <div className={styles.container2}>
          <h3 className={styles.h3Track}>{track.name}</h3>
          <p className={styles.pTrack}>
            {track.artist} | {track.album}{" "}
          </p>
          <br />
          <audio className={styles.audio} controls>
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
