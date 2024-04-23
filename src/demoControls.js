import React from "react";
import {useState} from 'react';

const DemoControls = (props) => {
  const {progress, addProgress, subtractProgress, clearProgress} = props;


  return (
    <div className="demo-container">
      <h3>Demo Progress Controlls</h3>
      <div>
      <button onClick={subtractProgress}>-</button>
      {progress}
      <button onClick={addProgress}>+</button>
      </div>
      <button onClick={clearProgress}>Clear Progress</button>

    </div>
  )
};

export default DemoControls;