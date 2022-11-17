import React from "react";
import Modal from './modal.js';
import Accordion from './accordion.js';
import RunnerInfo from './runner.js';
import {useState} from 'react';

const RunnersInfo = (props) => {
  const {runners, close, update, organizer} = props;
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
              title={`Runner ${runner.id}:  ${runner.runner}`}
              content={
                <div>
                <h2>{runner.phone}</h2>
                <h2>{`${runner.pace} minutes per mile`}</h2>
                {organizer && <button onClick={editRunner}>Edit Runner</button>}
                {edit && <RunnerInfo close={ () => { editRunner(); }} edit={edit} update={update} runnerID={runner.id}/>}
                </div>
              }
            />)
          })}
          {organizer && <button onClick={addRunner}>Add Runner</button>}
          {add && <RunnerInfo close={ () => { addRunner(); }} edit={edit} update={update}/>}
        </div>
      }
      />
  )
}

export default RunnersInfo;