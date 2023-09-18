import { useState, useEffect } from 'react'
import axios from 'axios';
import search from './assets/icons/search.svg'
import './App.css';
import Songs from './components/Songs';

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [songs, setSongs] = useState([])

  async function fetchData() {
    const response = await axios.get('http://localhost:3004/songs');
    setSongs(response.data);
    console.log(response.data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const newSongs = songs.filter(song => 
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) || song.artist.toLowerCase().includes(searchTerm.toLowerCase()))
      setSongs(newSongs)
      console.log('new', newSongs)
    }


  return (
    <div>
      <header className='App-header'>
        <div className='header-info'>
          <h1>NEW SONGS DELIVERED EVERY WEEK</h1>
          <p>Here are the most recent additions to the Yousician App. Start playing today!</p>
        </div>
        <div className='input-container'>
            <input
              type='text'
              placeholder='Search for songs by artist or title'
              className='search-input'
              onChange={handleSearchChange}
              value={searchTerm || ''}
              aria-label='search' />
            <div className='search-icon' onClick={handleSearch} />
        </div>
      </header>
      <Songs songs={songs} />
    </div>
  );
}

export default App;

//create filter search like this and replace?? song list
//create level icon indicator somehow (fontawesome?) and then put that in SingleSong where level is now
//for favorites, not sure yet
