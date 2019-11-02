import React, {useState} from 'react';
import TimeKeeper from 'react-timekeeper';

const Time = () => {

    const [time, setTime] = useState('12:34pm')
    const [showTime, setShowTime] = useState(true)

    return (
        <div>
            <text>
            Start Time
            </text>
            {showTime &&
                <TimeKeeper
                    time={time}
                    onChange={(newTime) => setTime(newTime.formatted12)}
                    onDoneClick={() => setShowTime(false)}
                    switchToMinuteOnHourSelect
                />
            }
            <span> {time}</span>
            {/* {!showTime &&
                <button onClick={() => setShowTime(true)}>Show</button>
            } */}
        </div>
    )

}

export default Time