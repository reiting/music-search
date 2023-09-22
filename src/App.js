import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css';
import Songs from './components/Songs';
import Filter from './components/Filter';

function App() {
  const [search, setSearch] = useState({
    searchTerm: '',
    songs: []
  })
  const [allSongs, setAllSongs] = useState([])
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const results = allSongs.filter(song => {
        if (e.target.value === "") return search.songs
        return song.title.toLowerCase().includes(e.target.value.toLowerCase() || song.artist.toLowerCase().includes(e.target.value.toLowerCase()))
    })
    setSearch({
        searchTerm: e.target.value,
        songs: results
    })
}

  async function fetchData() {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3004/songs');
      setAllSongs(response.data);
      setSearch({songs: response.data})
      setLoading(false)
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  // const handleSearchChange = e => {
  //   setSearchTerm(e.target.value);
  //   // let newSongs = songs.filter(song =>
  //   //   song.title.toLowerCase().includes(searchTerm.toLowerCase()) || song.artist.toLowerCase().includes(searchTerm.toLowerCase()))
  //   // setSongs(newSongs)
  // };

  // const handleSearch = () => {
  //   const newSongs = songs.filter(song =>
  //     song.title.toLowerCase().includes(search.searchTerm.toLowerCase()) || song.artist.toLowerCase().includes(search.searchTerm.toLowerCase()))
  //   setSongs(newSongs)
  // }

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
            onChange={handleChange}
            value={search.searchTerm || ''}
            aria-label='search'
          />
        </div>
      </header>
      <div>
        <Filter songs={search.songs} setSongs={setSearch} />
        <Songs songs={search.songs} loading={loading} />
      </div>
    </div>
  );
}

export default App;