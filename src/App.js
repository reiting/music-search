import { useState, useEffect } from 'react'
import axios from 'axios';
import search from './assets/icons/search.svg'
import './App.css';
import Songs from './components/Songs';

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [songs, setSongs] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:3004/songs');
      setSongs(response.data);
      console.log(response.data);
    }
    fetchData();
  }, []);

  const onChange = e => {
    setSearchTerm(e.target.value);
  };

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
            value={searchTerm}
            aria-label='search' />
          <div className='search-icon' onClick={onChange} />
        </div>
      </header>
      <Songs songs={songs} />
    </div>

  );
}

export default App;
