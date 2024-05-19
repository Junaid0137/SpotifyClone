import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-library-read",
    "user-top-read",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-modify-playback-state",
    "streaming",
    "user-follow-read",
    "user-read-currently-playing",
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-email",
    "streaming",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    // "user-library-modify"
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-follow-read",
];

const params = {
    scope: scopes,
};

const queryParamString = new URLSearchParams(params).toString();

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXTPUBLIC_SPOTIFY_CLIENT_ID,
    clientSecret: process.env.NEXTPUBLIC_SPOTIFY_CLIENT_SECRET,
    // redirectUri: "http://localhost:3000/api/auth/callback/spotify",
    // scope: scopes,
});

export default spotifyApi;

export { LOGIN_URL };