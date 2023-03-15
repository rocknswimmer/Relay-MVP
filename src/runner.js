import React from "react";
import Modal from './modal.js';
import axios from 'axios';
import {useState} from 'react';

const RunnerInfo = (props) => {
  const {close, edit, update, runnerID} = props;
  const [runner, setRunner] = useState('');
  const [phone, setPhone] = useState('');
  const [pace, setPace] = useState('');
  const approvedRunnerPhoneNumberValues = '1234567890'.split('');
  const approvedRunnerNameValues = 'abcdefghijklmnopqrstuvwxyz 1234567890'.split('');// since demo names are and 2 had to include numbers for consistency
  const approvedPaceValues = '1234567890.'.split('');

  const onRunner = (e) => {
    setRunner(e.target.value);
  };

  const onPhone = (e) => {
    setPhone(e.target.value);
    };

  const onPace = (e) => {
    setPace(e.target.value);
  };

  const updateRunner = () => {

    axios.put('/runner', {runner: runner, phone: phone, pace: pace, runnerID: runnerID})
      .then((res) => {
        update();
        close();
      })
      .catch((err) => {
        console.log('error updating runner info', err);
      })
  };

  const addRunner = () => {
    axios.post('/runner/new', {runner: runner, phone: phone, pace: pace})
      .then((res) => {
        update();
        close();
      })
      .catch((err) => {
        console.log('error adding new runner', err);
      })
  }

  return (
    <Modal
    close={close}
    content={
      <div>
        <label>Runner Name</label>
        <input type='text' placeholder='ex. John Doe' onChange={onRunner}/>
        <br/>
        <label>Phone Number</label>
        <input type='text' placeholder='ex. 5553334444' onChange={onPhone}/>
        <br/>
        <label>10K Pace</label>
        <input type='text' placeholder='ex. 10.5 for 10:30/mile' onChange={onPace}/>
        <br/>
        <button onClick={edit ? updateRunner : addRunner}>{ edit ? 'Edit Runners Info' : 'Add New Runner'}</button>
      </div>
    }
    />
  )
}

export default RunnerInfo;