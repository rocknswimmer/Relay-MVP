import React from "react";
import Accordion from './accordion.js';
import LegForm from './leg.js';
import {useState} from 'react';

const Legs = (props) => {
  const {legs, completed, update} = props;
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);

  const editLeg = () => {
    setEdit(!edit);
  };

  const addLeg = () => {
    setAdd(!add);
  };


  return (
    <div>
      {legs.map((leg, i) => {
        return (<div className="accordion-fake-title" key={i}><button onClick={() => { completed(leg.id); }}>complete</button><Accordion
          complete={leg.complete}
          title={<div>{` Leg ${leg.id}`}</div>}
          content={
            <div>
              <h1>{leg.runner}</h1>
              <h2>{`${leg.distance} miles`}</h2>
              <button onClick={editLeg}>Edit Leg</button>
              {edit && <LegForm close={ () => { editLeg(); }} edit={edit} update={update} legID={leg.id} />}
            </div>
          }
        /></div>)
      })}
      <button onClick={addLeg}>Add a New Leg</button>
      <button>Mark Leg Complete</button>
      {add && <LegForm close={ () => { addLeg(); }} edit={edit} update={update} />}
    </div>

  )
}


export default Legs;