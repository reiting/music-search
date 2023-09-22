import SingleSong from './SingleSong'
import './Songs.css'
import LoadingSpinner from './LoadingSpinner'

const Songs = ({ songs, loading }) => {
  return (
    <div>
      {loading ? <LoadingSpinner /> :
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
      }
    </div>
  )
}

export default Songs