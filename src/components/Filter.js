import { useState } from 'react'
import filterIcon from "../assets/icons/filter.svg";
import whiteFilterIcon from '../assets/icons/filter_white.svg'
import './Filter.css'
import axios from 'axios';
import {
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import RadialSeparators from './RadialSeparators';

const Filter = ({ songs, setSongs }) => {
  const [selected, setSelected] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState([])

  const handleFilter = () => {
    setSelected(!selected)
  }

  const getLevels = () => {
    return selectedLevel.join(",");
  }
  const levelList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  return (
    <div className='sort'>
      <div className='filter'>
        <p className='filter-button'>{selected ? 'HIDE FILTER ' : 'FILTER BY LEVEL '}</p>
        <button className="search-button" onClick={handleFilter}>
          {!selected && selectedLevel.length > 0 ?
            <div className='flex-button'>
              <p className='level-number'>{getLevels()}</p>
              <img src={filterIcon} alt='filter button icon' className='filter-icon' />
            </div>
            :
            <img src={whiteFilterIcon} alt='filter button icon' className='white-filter-icon' />}
        </button>
      </div>

      {selected && (
        <div className='levels'>
          {levelList.map(level => {
            const handleBtn = async () => {
              if (!selectedLevel.includes(level)) {
                setSelectedLevel([...selectedLevel, level])
              } else if (selectedLevel.includes(level)) {
                let deleteEntry = selectedLevel.filter(function (entry) {
                  return entry !== level
                })
                setSelectedLevel(deleteEntry)
              }
              const addLevels = async () => {
                let webAddress = `http://localhost:3004/songs?level=${level}`
                if (selectedLevel.length > 0) {
                  let endpoint = '';
                  for (let i = 0; i < selectedLevel.length; i++) {
                    let newLevel = `&level=${selectedLevel[i]}`
                    endpoint += newLevel
                    try {
                      let response = await axios.get(webAddress + endpoint)
                      setSongs({ songs: response.data })
                    } catch (error) {
                      console.error('Error:', error)
                    }
                  }
                } else {
                  try {
                    const response = await axios.get(webAddress)
                    setSongs({ songs: response.data })
                  } catch (error) {
                    console.error('Error:', error)
                  }
                }
              }
              addLevels()
            }

            const levelColor = () => {
              if (selectedLevel.includes(level)) {
                return '#ffffff'
              } else if (level >= 0 && level < 6) {
                return '#6fc13e'
              } else if (level >= 6 && level < 11) {
                return '#ff8e00'
              } else {
                return '#dc001c'
              }
            }

            return (
              <div className='progress-circle'>
                <div className='circle'>
                  <CircularProgressbarWithChildren
                    minValue={0}
                    maxValue={15}
                    value={level}
                    text={level}
                    strokeWidth={5}
                    background={true}
                    circleRatio={selectedLevel.includes(level) ? 0 : 1}
                    styles={{
                      text: {
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        fill: selectedLevel.includes(level) ? '#000000' : '#ffffff',
                      },
                      path: {
                        strokeLinecap: 'butt',
                        stroke: levelColor()
                      },
                      trail: {
                        strokeLinecap: 'butt',
                      },
                      background: {
                        fill: selectedLevel.includes(level) ? '#ffffff' : '#000000'
                      }
                    }}
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
                </div>
                <button className='progress-button' onClick={handleBtn} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default Filter;