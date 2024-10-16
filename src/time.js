import React from "react";
import {useState} from 'react';
import axios from 'axios';

const TimeField = (props) => {
  const {legs, update, secondHalf} = props;
  const [startTime, setStartTime] = useState('');
  const approvedTimeValues = '1234567890'.split('')

  const onTime = (e) => {
    const unixTime = new Date(e.target.value).getTime()
    setStartTime(unixTime);
  };

  const updateTime = () => {
      let previous = startTime
      let currStart = startTime
      let currEnd = 'TBD'
      let currLeg = 1;
      let convertedStart = '';
      let convertedStartPacific = '';
      let convertedEnd = '';
      let convertedEndPacific = '';

      let updatedLegs = legs.map((leg, i) => {

        currStart = previous;

        currLeg = Math.floor(leg.distance * leg.pace * 60000);
        currEnd = currStart + currLeg;
        previous = currEnd;

        convertedStart = new Intl.DateTimeFormat('en-US', { weekday: 'short', hour: 'numeric', minute: 'numeric' }).format(currStart);
        convertedStartPacific = new Intl.DateTimeFormat('en-US', { timeZone: "America/Los_Angeles", weekday: 'short', hour: 'numeric', minute: 'numeric' }).format(currStart);
        convertedEnd = new Intl.DateTimeFormat('en-US', { weekday: 'short', hour: 'numeric', minute: 'numeric' }).format(currEnd);
        convertedEndPacific = new Intl.DateTimeFormat('en-US', { timeZone: "America/Los_Angeles", weekday: 'short', hour: 'numeric', minute: 'numeric' }).format(currEnd);

        if(secondHalf){
          return axios.put('/time2', { start_time: convertedStart, end_time: convertedEnd, legID: leg.id, pacific_start: convertedStartPacific, pacific_end: convertedEndPacific})
        }
        return axios.put('/time1', { start_time: convertedStart, end_time: convertedEnd, legID: leg.id, pacific_start: convertedStartPacific, pacific_end: convertedEndPacific})

      });

      Promise.all(updatedLegs)
        .then((data) => {
          update();
        })
        .catch((err) => {
          console.log('error updating times ', err);
        })
  }

  return (
    <div>
      {!secondHalf && <label>Update/Add Race Start Time</label>}
      {secondHalf && <label>Update/Add After Break Start Time</label>}
      <br/>
      <label>Start Time:</label>
      <input type="datetime-local" onChange={onTime}></input>
      <br/>
      <button onClick={updateTime}>Update Time</button>
    </div>
  )
};

export default TimeField;