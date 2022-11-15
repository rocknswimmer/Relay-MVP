import React from "react";
import Modal from './modal.js';
import Accordion from './accordion.js';
import axios from 'axios';
import RunnerInfo from './runner.js';
import {useState} from 'react';

const RunnersInfo = (props) => {
  const {runners, close, update} = props;
  const [edit, setEdit] = useState(false);

  const editRunner = () => {
    setEdit(!edit);
  };

  return (
    <Modal
      close={() => { close(); }}
      content={
        <div>
          {runners.map((runner, i) => {
            return (<Accordion
              key={i}
              title={'Runner ' + runner.id}
              content={
                <div>
                <h1>{runner.runner}</h1>
                <h2>{runner.phone}</h2>
                <button onClick={setEdit}>Edit Runner</button>
                {edit && <RunnerInfo close={ () => { setEdit(); }}/>}
                </div>
              }
            />)
          })}
          <button>Add Runner</button>
        </div>
      }
      />
  )
}


export default RunnersInfo;