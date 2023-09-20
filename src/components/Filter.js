import { useState } from 'react'
import filterIcon from "../assets/icons/filter.svg";
import './Filter.css'
import axios from 'axios';
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import RadialSeparators from './RadialSeparators';

const Filter = ({ songs, setSongs }) => {
  const [selected, setSelected] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState([])

  const changeP = () => {
    setSelected(!selected)
  }
  const levelList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  return (
    <div className='sort'>
      <div className='filter'>
        <p className='filter-button'>{selected ? 'FILTER BY LEVEL' : 'HIDE FILTER'}</p>
        <button className="search-button" onClick={changeP}>
          <img src={filterIcon} alt='filter button icon' />
        </button>
      </div>

      <div className='levels'>
        {levelList.map(level => {
          const levelColor = () => {
            if (selectedLevel === level) {
              return '#ffffff'
            }
            else if (level >= 0 && level < 6) {
              return 'green'
            } else if (level >= 6 && level < 11) {
              return 'orange'
            } else {
              return 'red'
            }
          }
          const handleBtn = async () => {
            setSelectedLevel(level)
            try {
              const response = await axios.get('http://localhost:3004/songs?level=' + level)
              setSongs(response.data)
            } catch (error) {
              console.log('Error:', error)
            }
          }
          return (
            <div className='progress-circle'>
              <CircularProgressbarWithChildren
                minValue={0}
                maxValue={15}
                value={level}
                text={level}
                strokeWidth={2}
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
                    height: `${2}%`
                  }}
                />
              </CircularProgressbarWithChildren>
              <button className='progress-button' onClick={handleBtn}>LEVEL</button>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Filter;