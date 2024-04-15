import "./styles.css";
import { useState } from "react";
const tempMusicData = [
  {
    id: 1,
    title: "Agora Hills",
    artist: "Doja Cat",
    genre: "R&B",
    userRating: 5,
  },
  {
    id: 2,
    title: "The Flag is Raised",
    artist: "Bladee, Ecco2k",
    genre: "Cloud Rap",
  },
  {
    id: 3,
    title: "LDR",
    artist: "Shoti",
    genre: "Pop",
  },
];
const tempPlaylist = [
  {
    id: 1,
    title: "Club Classics",
    artist: "Charli XCX",
    genre: "Pop",
  },
  {
    id: 2,
    title: "TYRANT",
    artist: "Beyonce",
    genre: "Hip Hop",
  },
  {
    id: 3,
    title: "Hunter",
    artist: "Bjork",
    genre: "Art Pop",
  },
];
//structural
function App() {
  const [music, setMusic] = useState(tempMusicData);
  return (
    <>
      <NavBar>
        <NumResult music={music} />
      </NavBar>
      <Main>
        <Box title="Music Lists">
          <Music music={music} />
        </Box>
        <Box title="Playlist">
          <PlayList />
        </Box>
      </Main>
    </>
  );
}
export default App;

//structural
function NavBar({ children }) {
  return (
    <nav className="container">
      <Logo />
      <Search />
      {children}
    </nav>
  );
}
//stateless
function Logo() {
  return <h1 style={{ textAlign: "center" }}>Music App</h1>;
}
//stateless
function NumResult({ music }) {
  return (
    <p>
      Found <strong>{music.length}</strong> results
    </p>
  );
}
//stateful - component with state
function Search() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search songs..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function Box({ children, title }) {
  return (
    <div className="containter">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

/*structural component -
function MusicListBox({ music }) {
  return (
    <div className="container">
      <h2>Music List</h2>
      <Music music={music} />
    </div>
  );
}
*/
//stateful
function Music({ music }) {
  return (
    <ul>
      {music.map((music) => (
        <li key={music.id}>
          {music.title} by {music.artist} ({music.genre})<button>♥️</button>
        </li>
      ))}
    </ul>
  );
}
/*structural
function PlayListBox() {
  return (
    <div className="container">
      <h2>Playlist</h2>
      <PlayList />
    </div>
  );
}
*/
//stateful
function PlayList() {
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const addToPlaylist = (music) => {
    setPlaylist([...playlist, music]);
  };
  return (
    <ul>
      {playlist.map((music) => (
        <li key={music.id}>
          {music.title} by {music.artist}
          <p>
            <span>😮</span>
            <span>5</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
//structural
function Main({ children }) {
  return <div className="container">{children}</div>;
}

//stateless/ presentational component
//stateful component
//structural component

/*
function App(){
  return(
    <div>
      <Modal>
        <Success num={1}/>
         <p>mabuhay!</p>
      </Modal>
      <Modal>
        <p> errrrorrr! </p>
      </Modal>
    </div>
  )
}
export default App;

function Modal({children}){
  return (
  <div>
    {children}
  </div> 
  );
}
function Success(){
  return <p>Congrats!</p>
}
function Error(){
  return <p>Sorry!</p>
}
*/
