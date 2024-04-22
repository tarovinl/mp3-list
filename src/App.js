import "./styles.css";
import { useEffect, useState } from "react";

const CLIENT_ID = "7e471f01e0e842d584558a4b4deaa42f";
const CLIENT_SECRET = "82da74b800eb4d1e9fbf6b45c34f06ff";
function App() {
  const [music, setMusic] = useState();
  // const [playlist, setPlaylist] = useState();
  // const [filteredMusic, setFilteredMusic] = useState();
  // const [sortBy, setSortBy] = useState("title");

  // const handleSearch = (searchTerm) => {
  //   const filtered = music.filter(
  //     (musicItem) =>
  //       musicItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       musicItem.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       musicItem.genre.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  //   setFilteredMusic(filtered);
  // };

  // const addToPlaylist = (music) => {
  //   setPlaylist([...playlist, music]);
  // };

  return (
    <div style={{ backgroundImage: `url('/bg.png')` }}>
      <NavBar>
        <Search setMusic={setMusic} />
        <NumberResult music={music} />
      </NavBar>
      <Main>
        <Box>
          <Music music={music} />
        </Box>
        <Box>
          <Playlist />
        </Box>
      </Main>
    </div>
  );
}

function NavBar({ children, onSearch }) {
  return (
    <nav className="navigation">
      <Logo />
      <Search onSearch={onSearch} />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div>
      <img src="/logo.png" alt="Music App Logo" />
    </div>
  );
}

function NumberResult({ music }) {
  return (
    <p>
      Found <strong></strong> results
    </p>
  );
}

function Search({ setMusic }) {
  const [query, setQuery] = useState("");
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    var authParameter = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    fetch("https//accounts.spotify.com/api/token", authParameter)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  async function search() {
    console.log("Searching for " + query);

    var trackParameter = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    var tracks = await fetch(
      "https://api.spotify.com/v1/search?q=" + query + "&type=track&limit=50",
      trackParameter
    )
      .then((result) => result.json())
      .then((data) => setMusic(data.tracks.items));
  }

  return (
    <input
      className="search"
      type="text"
      placeholder="Search music..."
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          search();
        }
      }}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Music({ music }) {
  // const [sortOption, setSortOption] = useState("alphabetical");
  // const addToPlayList = (music) => {
  //   const index = playlist.findIndex((item) => item.id === music.id);
  //   if (index === -1) {
  //     setPlaylist([...playlist, music]);
  //   } else {
  //     const updatedPlaylist = playlist.filter((item) => item.id !== music.id);
  //     setPlaylist(updatedPlaylist);
  //   }
  // };

  // const sortMusic = (a, b) => {
  //   if (sortOption === "alphabetical") {
  //     return a.title.localeCompare(b.title);
  //   } else if (sortOption === "genre") {
  //     return a.genre.localeCompare(b.genre);
  //   }
  //   return 0;
  // };

  return <ul>{music}</ul>;
}

function Box({ children }) {
  return <div className="container">{children}</div>;
}

function Playlist({ playlist }) {
  // const uniqueArtistCount = () => {
  //   const uniqueArtists = new Set(playlist.map((music) => music.artist));
  //   return uniqueArtists.size;
  // };

  return (
    <>
      <h1>Playlist</h1>

      {/* <ul>
        {playlist.map((music) => (
          <li key={music.id}>
            <p>
              <h3> {music.title}</h3> by {music.artist}
              <span></span>
              <span>{music.rating}</span>
            </p>
          </li>
        ))}
      </ul> */}
      <p>{/* <strong>{playlist.length}</strong> Songs */}</p>
      {/* <p>
        <strong>{uniqueArtistCount()}</strong> Artists
      </p> */}
    </>
  );
}

function Main({ children }) {
  return <div className="container">{children}</div>;
}

export default App;
//structural
// function App() {
//   const [music, setMusic] = useState(tempMusicData);
//   const [sortBy, setSortBy] = useState("input");
//   let sortedSongs;

//   if (sortBy === "input") sortedSongs = music;
//   if (sortBy === "name")
//     sortedSongs = music.slice().sort((a, b) => a.name.localeCompare(b.name));
//   if (sortBy === "isChecked")
//     sortedSongs = music
//       .slice()
//       .sort((a, b) => Number(a.isChecked) - Number(b.isChecked));

//   // Define addToPlaylist function
//   const addToPlaylist = (song) => {
//     // Assuming you have a state for playlist in App component
//     // Update the playlist state here
//   };

//   return (
//     <>
//       <NavBar>
//         <NumResult music={music} />
//       </NavBar>
//       <Main>
//         <Box title="Music Lists">
//           <Music music={music} addToPlaylist={addToPlaylist} />
//         </Box>
//         <Box title="Playlist">
//           <PlayList />
//         </Box>
//       </Main>
//     </>
//   );
// }

// export default App;

// //structural
// function NavBar({ children }) {
//   return (
//     <nav className="container">
//       <Logo />
//       <Search />
//       {children}
//     </nav>
//   );
// }
// //stateless
// function Logo() {
//   return <h1 style={{ textAlign: "center" }}>Music App</h1>;
// }
// //stateless
// function NumResult({ music }) {
//   return (
//     <p>
//       Found <strong>{music.length}</strong> results
//     </p>
//   );
// }
// //stateful - component with state
// function Search() {
//   const [query, setQuery] = useState("");
//   return (
//     <input
//       className="search"
//       type="text"
//       placeholder="Search songs..."
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//     />
//   );
// }
// function Box({ children, title }) {
//   return (
//     <div className="containter">
//       <h2>{title}</h2>
//       {children}
//     </div>
//   );
// }

// /*structural component -
// function MusicListBox({ music }) {
//   return (
//     <div className="container">
//       <h2>Music List</h2>
//       <Music music={music} />
//     </div>
//   );
// }
// */
// //stateful
// function Music({ music, addToPlaylist }) {
//   return (
//     <ul>
//       {music.map((song) => (
//         <li key={song.id}>
//           {song.title} by {song.artist} ({song.genre})
//           <button onClick={() => addToPlaylist(song)}>♥️</button>
//         </li>
//       ))}
//     </ul>
//   );
// }
// /*structural
// function PlayListBox() {
//   return (
//     <div className="container">
//       <h2>Playlist</h2>
//       <PlayList />
//     </div>
//   );
// }
// */
// //stateful
// function PlayList() {
//   const [playlist, setPlaylist] = useState(tempPlaylist);
//   const addToPlaylist = (song) => {
//     setPlaylist([...playlist, song]);
//   };
//   return (
//     <ul>
//       {playlist.map((song) => (
//         <li key={song.id}>
//           {song.title} by {song.artist}
//           <p>
//             <span>😮</span>
//             <span>5</span>
//           </p>
//         </li>
//       ))}
//     </ul>
//   );
// }
// //structural
// function Main({ children }) {
//   return <div className="container">{children}</div>;
// }

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

// function App() {
// fetch("https://jsonplaceholder.typicode.com/todos").then((result) =>
//   result.json().then((data) => console.log(data))
// );

//   async function getTodos() {
//     const result = await fetch("https://jsonplaceholder.typicode.com/todos");
//     const data = await result.json();
//     console.log(data);
//   }
//   getTodos();
//   console.log("Kev");
//   return <div>Hello App!</div>;
// }

// export default App;
