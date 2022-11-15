import React from "react";
import Modal from './modal.js';
import Accordion from './accordion.js';

const RunnersInfo = (props) => {
  const {runners, close} = props;


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
                </div>
              }
            />)
          })}
        </div>
      }
      />
  )
}


export default RunnersInfo;