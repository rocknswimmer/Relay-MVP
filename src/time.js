import React from "react";
import {useState} from 'react';
import axios from 'axios';

const TimeField = (props) => {
  const {legs, update, runners} = props;
  const [startTime, setStartTime] = useState('');

  const onTime = (e) => {
    setStartTime(e.target.value);
  };

  const updateTime = () => {
    console.log('will eventually map through legs using start time', startTime);

    let previous = Number(startTime);
    let currStart = Number(startTime);
    let currEnd = 'TBD'
    let currLeg = 1;
    let convertedStart = '';
    let convertedEnd = '';


    let updatedLegs = legs.map((leg, i) => {

      currStart = previous;

      currLeg = Math.floor(leg.distance * runners[leg.runner_id - 1].pace) * 60000;// distance * pace/mile in mins * 60 sec * millisecs
      currEnd = currStart + currLeg;
      previous = currEnd;


      // convertedStart = convertTime(currStart);
      // convertedEnd = convertTime(currEnd);

return({start: currStart, end: currEnd});

      // return axios.put('/time', {start_time: convertedStart, end_time: convertedEnd, legID: leg.id})
      // .then((res) => {
      //   console.log(res);
      //   update();
      //   close();
      // })
      // .catch((err) => {
      //   console.log('error updating leg info', err);
      // })
    });
    console.log(updatedLegs);

    // Promise.all(updatedLegs)
    //   .then((data) => {
    //     console.log('updated times ', data);
    //   })
    //   .catch((err) => {
    //     console.log('error updating times ',  err);
    //   })

  }

  return (
    <div>
      <label>Update/Add Race Start Time</label>
      <br/>
      <input type="text" placeholder="Unix Time For start" onChange={onTime} />
      <br/>
      <button onClick={updateTime}>Update Time</button>
    </div>
  )
};

export default TimeField;