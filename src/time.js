import React from "react";
import {useState} from 'react';
import axios from 'axios';

const TimeField = (props) => {
  const {legs, update, runners} = props;
  const [startTime, setStartTime] = useState('');
  const approvedTimeValues = '1234567890'.split('')

  const onTime = (e) => {
    const unixTime = new Date(e.target.value).getTime()
    setStartTime(unixTime);
  };

  const updateTime = () => {
    // console.log('will eventually map through legs using start time', startTime, 'with type:', typeof startTime);

    // if(startTime.length > 0 && startTime.split('').every((char) => {return approvedTimeValues.indexOf(char) !== -1})){

      // console.log('will eventually map through legs using start time', startTime);

      let previous = startTime//Number(startTime) * 1000; // convert unix seconds to milliseconds to match math
      let currStart = startTime//Number(startTime);
      let currEnd = 'TBD'
      let currLeg = 1;
      let convertedStart = '';
      let convertedStartPacific = '';
      let convertedEnd = '';
      let convertedEndPacific = '';

      let updatedLegs = legs.map((leg, i) => {

        currStart = previous;

        currLeg = Math.floor(leg.distance * runners[leg.runner_id - 1].pace * 60000);// distance * pace/mile in mins * 60 sec * millisecs
        currEnd = currStart + currLeg;
        previous = currEnd;

        // console.log(new Intl.DateTimeFormat('en-US', {dateStyle: 'full', timeStyle: 'long', timeZone:'America/New_York'}).format(currStart));

        convertedStart = new Intl.DateTimeFormat('en-US', { weekday: 'short', hour: 'numeric', minute: 'numeric' }).format(currStart);
        convertedStartPacific = new Intl.DateTimeFormat('en-US', { timeZone: "America/Los_Angeles", weekday: 'short', hour: 'numeric', minute: 'numeric' }).format(currStart);
        convertedEnd = new Intl.DateTimeFormat('en-US', { weekday: 'short', hour: 'numeric', minute: 'numeric' }).format(currEnd);
        convertedEndPacific = new Intl.DateTimeFormat('en-US', { timeZone: "America/Los_Angeles", weekday: 'short', hour: 'numeric', minute: 'numeric' }).format(currEnd);

        return axios.put('/time', { start_time: convertedStart, end_time: convertedEnd, legID: leg.id, pacific_start: convertedStartPacific, pacific_end: convertedEndPacific})

      });

      Promise.all(updatedLegs)
        .then((data) => {
          update();
        })
        .catch((err) => {
          console.log('error updating times ', err);
        })
    // } else {
    //   alert(`Currently time needs to be a number that represents the unix time in milliseconds to start. Approved values are ${approvedTimeValues}`)
    // }

    /*
    Idead for handling timezones:
    1. store the unix time as a string, down side client handling of time change
    2. calc all time zones in above promise chain, down side long promise, more to break
    3. research if can convert in sql query, may combine with idea 1
    */

  }

  return (
    <div>
      <label>Update/Add Race Start Time</label>
      <br/>
      <label>Start Time:</label>
      <input type="datetime-local" onChange={onTime}></input>
      {/* <input type="text" placeholder="Unix Time For start" onChange={onTime} /> */}
      <br/>
      <button onClick={updateTime}>Update Time</button>
    </div>
  )
};

export default TimeField;