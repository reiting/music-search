import './SingleSong.css'
import axios from 'axios';
import whiteFavoriteButton from '../assets/icons/favorite_white.svg';
import redFavoriteButton from '../assets/icons/favorite_red.svg';
import { useState } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import RadialSeparators from './RadialSeparators';


const SingleSong = ({ song, isDark }) => {
  const { id, title, images, artist, level } = song;
  const [favoriteBtn, setFavoriteBtn] = useState(whiteFavoriteButton)

  
  const handleClick = async () => {
    try {
      await axios.post('http://localhost:3004/favorites', { 'songId': id })
      setFavoriteBtn(redFavoriteButton)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const levelColor = () => {
    if (level >= 0 && level < 6) {
      return 'green'
    } else if (level >= 6 && level < 11) {
      return 'orange'
    } else {
      return 'red'
    }
  }

  return (
    <li className='song' style={{ background: isDark ? '#000000' : '#101010' }}>
      <div className='album-image'>
        <img className='album-image' src={images} alt='artist album cover' />
      </div>
      <div className='song-info'>
        <h4 className='song-info song-title'>{title}</h4>
        <p className='song-info'>{artist}</p>
      </div>
      <div className='level-info'>
        <CircularProgressbarWithChildren
          minValue={0}
          maxValue={15}
          value={level}
          text={level}
          strokeWidth={5}
          styles={buildStyles({
            textColor: '#ffffff',
            strokeLinecap: 'butt',
            pathColor: levelColor()
          })}
        >
          <RadialSeparators
            count={3}
            style={{
              background: "#fff",
              width: "2px",
              // This needs to be equal to props.strokeWidth
              height: `${5}%`
            }}
          />
        </CircularProgressbarWithChildren>
      </div>
      <button className='favorite-button' onClick={handleClick}>
        <img src={favoriteBtn} alt='heart button' className='heart-icon' />
      </button>
    </li>
  )
}

export default SingleSong;