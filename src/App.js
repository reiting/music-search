import yousicianhero from './assets/yousician-hero.png'
import search from './assets/icons/search.svg'
import './App.css';

function App() {
  return (
    <header className="App-header">
      <img src={yousicianhero} className="App-logo" alt="yousician header" />
      <div className="input">
        <input type="text">
        </input>
        <button>
        <img src={search} className="search-box" alt="search box" />

        </button>
      </div>
    </header>
  );
}

export default App;
