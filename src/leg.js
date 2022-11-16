import React from "react";
import Modal from './modal.js';
import axios from 'axios';
import {useState} from 'react';

const LegForm = (props) => {
  const {close, edit, update, legID} = props;
  const [runner, setRunner] = useState('');
  const [distance, setDistance] = useState('');


  const onRunner = (e) => {
    setRunner(e.target.value);
    };

  const onDistance = (e) => {
    setDistance(e.target.value);
  };

  const updateLeg = () => {
    axios.put('/leg', {runner: runner, distance: distance, legID: legID})
      .then((res) => {
        console.log(res);
        update();
        close();
      })
      .catch((err) => {
        console.log('error updating leg info', err);
      })
  };

  const addleg = () => {
    axios.post('/leg/new', {runner: runner, distance: distance})
      .then((res) => {
        console.log(res);
        update();
        close();
      })
      .catch((err) => {
        console.log('error adding new leg', err);
      })
  }

  return (
    <Modal
    close={close}
    content={
      <div>
        <label>Runner Number</label>
        <input type='text' placeholder='ex. 1' onChange={onRunner}/>
        <br/>
        <label>Leg Distance</label>
        <input type='text' placeholder='ex. 3.1 for 3.1 miles' onChange={onDistance}/>
        <br/>
        <button onClick={edit ? updateLeg : addleg}>{ edit ? 'Edit Legs Info' : 'Add New Leg'}</button>
      </div>
    }
    />
  )
}

export default LegForm;