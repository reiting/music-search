import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import RadialSeparators from './RadialSeparators';

const LevelIndicator = ({level, value}) => {
  const levelColor = () => {
    if( level >= 0 && level < 6) {
      return 'green'
    } else if(level >= 6 && level < 11) {
      return 'orange'
    } else {
      return 'red'
    }
  }
  
  <CircularProgressbarWithChildren
    minValue={0}
    maxValue={15}
    value={value}
    text={value}
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
        height: `${10}%`
      }}
    />
  </CircularProgressbarWithChildren>
}

export default LevelIndicator
