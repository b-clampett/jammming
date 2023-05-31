//const redirectUri = "https://main--jammmingproj.netlify.app/";
const redirectUri = "http://localhost:3000";
const baseUrl = "https://accounts.spotify.com/authorize";

const Spotify = {
  _token: null,

  _authorization() {
    const authUrl = `${baseUrl}?response_type=token&client_id=${encodeURIComponent(
      process.env.REACT_APP_CLIENT_ID
    )}&scope=${encodeURIComponent(
      "playlist-modify-public"
    )}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location = authUrl;
  },

  _handleSpotifyCallback() {
    if (this.token) {
      return this.token;
    }

    const params = new URLSearchParams(window.location.hash.substring(1));
    const tokenParam = params.get("access_token");
    let timeExpires = Number(params.get("expires_in"));

    if (tokenParam && timeExpires) {
      timeExpires = timeExpires * 1000;
      this.token = tokenParam;

      window.history.pushState(null, null, "/");
      window.setTimeout(() => {
        this.token = null;
        this._handleSpotifyCallback();
        alert("Timeout function called");
      }, timeExpires);

      return tokenParam;
    } else {
      this._authorization();
    }
  },
  async search(trackQuery) {
    try {
      const token = await this._handleSpotifyCallback();
      //console.log(`The search token is ${token}`);
      const endpoint = `https://api.spotify.com/v1/search?type=track&q=${trackQuery}`;
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track, index) => {
          const responseObject = {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            preview: track.preview_url,
            index: index,
            userInput: "",
          };
          return responseObject;
        });
      } else {
        throw new Error("Request Failed!");
      }
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred during track search");
    }
  },
  async _getUserId() {
    try {
      const endpoint = "https://api.spotify.com/v1/me";
      const token = await this._handleSpotifyCallback();
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse.id;
      } else {
        throw new Error("Request Failed!");
      }
    } catch (error) {
      console.error(error);
      throw new Error("An error occured while fetching the user ID.");
    }
  },
  async _createPlaylist(playListName) {
    try {
      const userId = await this._getUserId();
      const token = await this._handleSpotifyCallback();
      const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
      const data = JSON.stringify({ name: playListName });
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: data,
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse.id;
      } else {
        throw new Error("Request Failed!");
      }
    } catch (error) {
      console.error(error.message);
      throw new Error("An error occured while creating the playlist");
    }
  },
  async handleSavePlaylist(uriTracks, playListName) {
    try {
      const playlistId = await this._createPlaylist(playListName);

      if (uriTracks.length > 100) {
        throw new Error("Too many Tracks: Tracks not to exceed 100");
      }

      const token = await this._handleSpotifyCallback();
      const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
      const data = JSON.stringify({ uris: uriTracks, position: 0 });
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: data,
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      } else {
        throw new Error("Request Failed!");
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export default Spotify;
