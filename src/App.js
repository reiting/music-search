import search from './assets/icons/search.svg'
import './App.css';

function App() {
  return (
    <header className="App-header">
      <div className='header-info'>
        <h1>NEW SONGS DELIVERED EVERY WEEK</h1>
        <p>Here are the most recent additions to the Yousician App. Start playing today!</p>
      </div>
      <div className='input-container'>
        <input
          type="text"
          placeholder="Search for songs by artist or title"
          className='search-input' 
          aria-label='search'/>
        <button className='search-icon'>
          <img src={search} className="search-icon" alt="search box" />
        </button>
      </div>

    </header>
  );
}

export default App;
