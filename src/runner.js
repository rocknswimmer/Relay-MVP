import React from "react";
import Modal from './modal.js';
import axios from 'axios';
import {useState} from 'react';

const RunnerInfo = (props) => {
  const {close} = props;

  const updateRunner = () => {
    axios.put('/runner', {})
      .then((res) => {
        update();
      })
      .catch((err) => {
        console.log('error updating runner info');
      })
  };


  return (
    <Modal
    close={close}
    content={'runner info form'}
    />
  )
}

export default RunnerInfo;