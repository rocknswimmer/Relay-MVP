import React from "react";
import Modal from './modal.js';
import axios from 'axios';
import {useState} from 'react';

const LegForm = (props) => {
  const {close, edit, update, legID} = props;
  const [runner, setRunner] = useState('');
  const [distance, setDistance] = useState('');
  const approvedRunnerNumberValues = '1234567890'.split('');
  const approvedDistanceValues = '1234567890.'.split('');


  const onRunner = (e) => {
    setRunner(e.target.value);
    };

  const onDistance = (e) => {
    setDistance(e.target.value);
  };

  const updateLeg = () => {
    if(((runner.length > 0 && runner.length < 3) && runner.split('').every((char) => {return approvedRunnerNumberValues.indexOf(char) !== -1}))
    && ((distance.length > 0 && distance.length < 5) && distance.split('').every((char) => {return approvedDistanceValues.indexOf(char) !== -1}))) {
       axios.put('/leg', {runner: runner, distance: distance, legID: legID})
      .then((res) => {
        console.log(res);
        update();
        close();
      })
      .catch((err) => {
        console.log('error updating leg info', err);
      })
    } else {
      alert(`runner number must be less than 100 and the distance should be less than 100 miles with a decimal. Approved runner number input values: ${approvedRunnerNumberValues} and approved distance input values: ${approvedDistanceValues}`)
    }

  };

  const addleg = () => {
    if(((runner.length > 0 && runner.length < 3) && runner.split('').every((char) => {return approvedRunnerNumberValues.indexOf(char) !== -1}))
    && ((distance.length > 0 && distance.length < 5) && distance.split('').every((char) => {return approvedDistanceValues.indexOf(char) !== -1}))) {
       axios.post('/leg/new', {runner: runner, distance: distance})
      .then((res) => {
        console.log(res);
        update();
        close();
      })
      .catch((err) => {
        console.log('error adding new leg', err);
      })
    } else {
      alert(`runner number must be less than 100 and the distance should be less than 100 miles with a decimal. Approved runner number input values: ${approvedRunnerNumberValues} and approved distance input values: ${approvedDistanceValues}`)
    }


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