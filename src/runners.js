import React from "react";
import Modal from './modal.js';
import Accordion from './accordion.js';
import RunnerInfo from './runner.js';
import {useState} from 'react';

const RunnersInfo = (props) => {
  const {runners, close, update} = props;
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);

  const editRunner = () => {
    setEdit(!edit);
  };

  const addRunner = () => {
    setAdd(!add);
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
                <button onClick={editRunner}>Edit Runner</button>
                {edit && <RunnerInfo close={ () => { editRunner(); }} edit={edit} update={update} runnerID={runner.id}/>}
                </div>
              }
            />)
          })}
          <button onClick={addRunner}>Add Runner</button>
          {add && <RunnerInfo close={ () => { addRunner(); }} edit={edit} update={update}/>}
        </div>
      }
      />
  )
}

export default RunnersInfo;