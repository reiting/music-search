import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css';
import Songs from './components/Songs';
import Filter from './components/Filter';

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [songs, setSongs] = useState([])

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:3004/songs');
      setSongs(response.data);
    } catch (error) {
      console.error('Error:', error)
    }
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
      <div>
        <Filter songs={songs} setSongs={setSongs}/>
        <Songs songs={songs} />
      </div>
    </div>
  );
}

export default App;