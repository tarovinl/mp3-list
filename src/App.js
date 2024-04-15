import "./styles.css";
import { useState } from "react";
const tempMusicData = [
  {
    id: 1,
    title: "Song 1",
    artist: "Artist A",
    genre: "Pop",
  },
  {
    id: 2,
    title: "Song 2",
    artist: "Artist B",
    genre: "Rock",
  },
  {
    id: 3,
    title: "Song 3",
    artist: "Artist C",
    genre: "Jazz",
  },
];
const tempPlaylist = [
  {
    id: 1,
    title: "Song 1",
    artist: "Artist A",
    genre: "Pop",
  },
  {
    id: 2,
    title: "Song 2",
    artist: "Artist B",
    genre: "Rock",
  },
  {
    id: 3,
    title: "Song 3",
    artist: "Artist C",
    genre: "Jazz",
  },
];

function NavBar() {
  return (
    <nav className="container">
      <h1 style={{ textAlign: "center" }}>Music App</h1>
      <Search />
      <p>
        {" "}
        Found <strong>X</strong> results
      </p>
    </nav>
  );
}
function Search() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function Main() {
  const [musics, setMusic] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const addToPlaylist = (music) => {
    setPlaylist([...playlist, music]);
  };
  return (
    <div className="container">
      <div className="container">
        <h2>Music List</h2>

        <ul>
          {musics.map((music) => (
            <li key={music.id}>
              {music.title} by {music.artist} ({music.genre})<button>♥️</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="container">
        <h2>Playlist</h2>
        <ul>
          {playlist.map((music) => (
            <li key={music.id}>
              {music.title} by {music.artist}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
function App() {
  return (
    <div>
      <NavBar />
      <Main />
    </div>
  );
}
export default App;
