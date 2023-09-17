import './SingleSong.css'

const SingleSong = ({ song, isDark }) => {
  const { id, title, images, artist, level } = song;

  return (
    <li className='song' style={{ background: isDark ? '#000000' : '#101010' }}
>
      <img src={images} alt='artist album cover' />
      <div className='song-info'>
        <h4 className='song-text'>{title}</h4>
        <p className='song-text'>{artist}</p>
      </div>
      <div className='level-info'>
        <p>{level}</p>
      </div>
    </li>
  )
}

export default SingleSong;