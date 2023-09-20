import SingleSong from './SingleSong'
import './Songs.css'

const Songs = ({ songs }) => {
  return (
    <div>
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
    </div>

  )
}

export default Songs