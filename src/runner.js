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
    if(((runner.length > 0 && runner.length < 26) && runner.split('').every((char) => {return approvedRunnerNameValues.indexOf(char.toLowerCase()) !== -1}))
    && (phone.length === 10 && phone.split('').every((char) => {return approvedRunnerPhoneNumberValues.indexOf(char) !== -1}))
    && ((pace.length > 0 && pace.length <= 5) && pace.split('').every((char) => {return approvedPaceValues.indexOf(char) !== -1}))) {
      axios.put('/runner', {runner: runner, phone: phone, pace: pace, runnerID: runnerID})
      .then((res) => {
        update();
        close();
      })
      .catch((err) => {
        console.log('error updating runner info', err);
      })
    } else {
      alert(`Runner name can only contain letters numbers and spaces, with max of 25 characters. Phone number needs to be 10 digits. Pace needs to be just the numbers with any decimals rounded to 2 significant figures. Approved Name Values: ${approvedRunnerNameValues} Approved Phone Values: ${approvedRunnerPhoneNumberValues} Approved Pace Values: ${approvedPaceValues}`)
    }


  };

  const addRunner = () => {
    if(((runner.length > 0 && runner.length < 26) && runner.split('').every((char) => {return approvedRunnerNameValues.indexOf(char.toLowerCase()) !== -1}))
    && (phone.length === 10 && phone.split('').every((char) => {return approvedRunnerPhoneNumberValues.indexOf(char) !== -1}))
    && ((pace.length > 0 && pace.length <= 5) && pace.split('').every((char) => {return approvedPaceValues.indexOf(char) !== -1}))) {
      axios.post('/runner/new', {runner: runner, phone: phone, pace: pace})
      .then((res) => {
        update();
        close();
      })
      .catch((err) => {
        console.log('error adding new runner', err);
      })
    } else {
      alert(`Runner name can only contain letters numbers and spaces, with max of 25 characters. Phone number needs to be 10 digits. Pace needs to be just the numbers with any decimals rounded to 2 significant figures. Approved Name Values: ${approvedRunnerNameValues} Approved Phone Values: ${approvedRunnerPhoneNumberValues} Approved Pace Values: ${approvedPaceValues}`)
    }

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
