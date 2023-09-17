import SingleSong from './SingleSong'
import './Songs.css'

const Songs = ({ songs }) => {

  return (
    <ul className='song-list'>
      {songs.map((song, index) => {
        return (
          <SingleSong
            key={song.id}
            song={song}
            isDark={index % 2}
          />
        )
      })}
        </ul>
)}

export default Songs