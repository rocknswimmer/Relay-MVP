import React from "react";
import Modal from './modal.js';
import axios from 'axios';
import {useState} from 'react';

const RunnerInfo = (props) => {
  const {close, edit, update} = props;
  const [runner, setRunner] = useState('');
  const [phone, setPhone] = useState('');
  const [pace, setPace] = useState('');

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
    // axios.put('/runner', {})
    //   .then((res) => {
    //     update();
    //     close();
    //   })
    //   .catch((err) => {
    //     console.log('error updating runner info');
    //   })
    console.log('would update runner', runner, phone, pace);
    update();
    close();
  };

  const addRunner = () => {
    console.log('would add new runner', runner, phone, pace);
    update();
    close();
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
        <input type='text' placeholder='5553334444' onChange={onPhone}/>
        <br/>
        <label>10K Pace</label>
        <input type='text' placeholder='ex. 10.5 for 10:30/mille' onChange={onPace}/>
        <br/>
        <button onClick={edit ? updateRunner : addRunner}>{ edit ? 'Edit Runners Info' : 'Add New Runner'}</button>
      </div>
    }
    />
  )
}

export default RunnerInfo;