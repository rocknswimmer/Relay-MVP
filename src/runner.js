import React from "react";
import Modal from './modal.js';
import axios from 'axios';
import {useState} from 'react';

const RunnerInfo = (props) => {
  const {close, edit, update} = props;

  const updateRunner = () => {
    // axios.put('/runner', {})
    //   .then((res) => {
    //     update();
    //   })
    //   .catch((err) => {
    //     console.log('error updating runner info');
    //   })
    console.log('would update runner');
    update();
    close();
  };

  const addRunner = () => {
    console.log('would add new runner');
    update();
    close();
  }



  return (
    <Modal
    close={close}
    content={
      <div>
        <label>Runner Name</label>
        <input type='text' placeholder='ex. John Doe' />
        <br/>
        <label>Phone Number</label>
        <input type='text' placeholder='ex. John Doe' />
        <br/>
        <label>10K Pace</label>
        <input type='text' placeholder='ex. 10.5 for 10:30/mille' />
        <br/>
        <button onClick={edit ? updateRunner : addRunner}>{ edit ? 'Edit Runners Info' : 'Add New Runner'}</button>
      </div>
    }
    />
  )
}

export default RunnerInfo;