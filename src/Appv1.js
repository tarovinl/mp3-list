import "./styles.css";
import { useState } from "react";
const tempMusicData = [
  {
    id: 1,
    title: "Agora Hills",
    artist: "Doja Cat",
    genre: "R&B",
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
  {
    id: 4,
    title: "Club Classics",
    artist: "Charli XCX",
    genre: "Pop",
  },
  {
    id: 5,
    title: "TYRANT",
    artist: "Beyonce",
    genre: "Hip Hop",
  },
  {
    id: 6,
    title: "Hunter",
    artist: "Bjork",
    genre: "Art Pop",
  },
  {
    id: 7,
    title: "MASC",
    artist: "Doja Cat, Teezo Touchdown",
    genre: "R&B",
  },
  {
    id: 8,
    title: "ZARI",
    artist: "Marina Satti",
    genre: "Pop",
  },
  {
    id: 9,
    title: "Time",
    artist: "Ecco2k",
    genre: "Hip Hop",
  },
  {
    id: 10,
    title: "Magnetic",
    artist: "ILLIT",
    genre: "KPop",
  },
  {
    id: 11,
    title: "Europapa",
    artist: "Joost",
    genre: "Dance",
  },
  {
    id: 12,
    title: "Von Dutch",
    artist: "Charli XCX",
    genre: "Electronic",
  },
  {
    id: 13,
    title: "true story",
    artist: "Ariana Grande",
    genre: "Pop",
  },
  {
    id: 14,
    title: "Pantropiko",
    artist: "BINI",
    genre: "Pop",
  },
  {
    id: 15,
    title: "don't wanna break up again",
    artist: "Ariana Grande",
    genre: "Pop",
  },
  {
    id: 16,
    title: "5 Years",
    artist: "Bjork",
    genre: "Art Pop",
  },
  {
    id: 17,
    title: "It's Not Up To You",
    artist: "Bjork",
    genre: "Art Pop",
  },
  {
    id: 18,
    title: "loml",
    artist: "Taylor Swift",
    genre: "Pop",
  },
  {
    id: 19,
    title: "Ex-Factor",
    artist: "Ms. Lauryn Hill",
    genre: "R&B",
  },

  {
    id: 20,
    title: "Musician",
    artist: "Porter Robinson",
    genre: "Electronic",
  },
  {
    id: 21,
    title: "I LUV IT",
    artist: "Camila Cabello",
    genre: "Pop",
  },
  {
    id: 22,
    title: "AAA Powerline",
    artist: "Ecco2k",
    genre: "Electronic",
  },
  {
    id: 23,
    title: "Western Union",
    artist: "Thaiboy Digital, Ecco2k, Bladee",
    genre: "Electronic",
  },
  {
    id: 24,
    title: "RIIVERDANCE",
    artist: "Beyonce",
    genre: "Dance",
  },
  {
    id: 25,
    title: "ART",
    artist: "Tyla",
    genre: "Afro",
  },
  {
    id: 26,
    title: "Good Luck, Babe!",
    artist: "Chappell Roan",
    genre: "Pop",
  },
  {
    id: 27,
    title: "Impossible",
    artist: "RIIZE",
    genre: "KPop",
  },
  {
    id: 28,
    title: "ballad of a homeschooled girl",
    artist: "Olivia Rodrigo",
    genre: "Pop",
  },
  {
    id: 29,
    title: "Clara Bow",
    artist: "Taylor Swift",
    genre: "Folk",
  },
  {
    id: 30,
    title: "Replay",
    artist: "SHINee",
    genre: "KPop",
  },
];
const tempPlaylist = [];
function App() {
  const [music, setMusic] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const [filteredMusic, setFilteredMusic] = useState(tempMusicData);
  const [sortBy, setSortBy] = useState("title");

  const handleSearch = (searchTerm) => {
    const filtered = music.filter(
      (musicItem) =>
        musicItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        musicItem.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        musicItem.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredMusic(filtered);
  };

  const addToPlaylist = (music) => {
    setPlaylist([...playlist, music]);
  };

  return (
    <div style={{ backgroundImage: `url('/bg.png')` }}>
      <NavBar onSearch={handleSearch}>
        <NumberResult music={filteredMusic} />
      </NavBar>
      <Main>
        <Box>
          <Music
            music={filteredMusic}
            playlist={playlist}
            setPlaylist={setPlaylist}
          />
        </Box>
        <Box>
          <Playlist playlist={playlist} />
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
      Found <strong>{music.length}</strong> results
    </p>
  );
}

function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    onSearch(searchTerm);
  };
  return (
    <input
      className="search"
      type="text"
      placeholder="Search music..."
      value={query}
      onChange={handleSearch}
    />
  );
}

function Music({ music, playlist, setPlaylist }) {
  const [sortOption, setSortOption] = useState("alphabetical");
  const addToPlayList = (music) => {
    const index = playlist.findIndex((item) => item.id === music.id);
    if (index === -1) {
      setPlaylist([...playlist, music]);
    } else {
      const updatedPlaylist = playlist.filter((item) => item.id !== music.id);
      setPlaylist(updatedPlaylist);
    }
  };

  const sortMusic = (a, b) => {
    if (sortOption === "alphabetical") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "genre") {
      return a.genre.localeCompare(b.genre);
    }
    return 0;
  };

  return (
    <ul>
      <h1>Songs</h1>
      <label htmlFor="sortOption">Sort by:</label>
      <select
        id="sortOption"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="alphabetical">Alphabetical</option>
        <option value="genre">Genre</option>
      </select>

      {music.sort(sortMusic).map((musicItem) => (
        <li
          key={musicItem.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span style={{ flex: 1 }}>
            <h3> {musicItem.title} </h3>by {musicItem.artist} ({musicItem.genre}
            )
          </span>
          <button
            onClick={() => addToPlayList(musicItem)}
            style={{
              width: "40px",
              marginLeft: "8px",
              backgroundColor: "#ffffff",
              textAlign: "center",
            }}
          >
            {playlist.some((item) => item.id === musicItem.id) ? (
              <i className="fa fa-times"></i>
            ) : (
              <i className="fa fa-plus"></i>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}

function Box({ children }) {
  return <div className="container">{children}</div>;
}

function Playlist({ playlist }) {
  const uniqueArtistCount = () => {
    const uniqueArtists = new Set(playlist.map((music) => music.artist));
    return uniqueArtists.size;
  };

  return (
    <>
      <h1>Playlist</h1>

      <ul>
        {playlist.map((music) => (
          <li key={music.id}>
            <p>
              <h3> {music.title}</h3> by {music.artist}
              <span></span>
              <span>{music.rating}</span>
            </p>
          </li>
        ))}
      </ul>
      <p>
        <strong>{playlist.length}</strong> Songs
      </p>
      <p>
        <strong>{uniqueArtistCount()}</strong> Artists
      </p>
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
