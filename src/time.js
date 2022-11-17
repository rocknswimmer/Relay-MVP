import React from "react";
import {useState} from 'react';

const TimeField = (props) => {
  const {legs, update} = props;
  const [startTime, setStartTime] = useState('');

  const onTime = (e) => {
    setStartTime(e.target.value);
  };

  const updateTime = () => {
    console.log('will eventually map through legs using start time', startTime);
  }

  return (
    <div>
      <label>Update/Add Race Start Time</label>
      <br/>
      <input type="text" placeholder="Whatever format I need" onChange={onTime} />
      <br/>
      <button onClick={updateTime}>Update Time</button>
    </div>
  )
};

export default TimeField;