import React from "react";
import Modal from './modal.js';
import Accordion from './accordion.js';

const RunnersInfo = (props) => {
  const {runners, close, update} = props;


  return (
    <Modal
      close={() => { close(); }}
      content={
        <div>
          {runners.map((runner, i) => {
            return (<Accordion
              key={i}
              title={' Runner ' + runner.id}
              content={
                <div>
                <h1>{runner.runner}</h1>
                <h2>{runner.phone}</h2>
                <button>Edit Runner</button>
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