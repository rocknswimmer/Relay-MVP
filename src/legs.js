import React from "react";
import Accordion from './accordion.js';
import LegForm from './leg.js';
import {useState} from 'react';
import axios from 'axios';

const Legs = (props) => {
  const {legs, completed, update, organizer, runnerView} = props;
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [marking, setMarking] = useState(false);
  const [diff, setDiff] = useState('');
  const allowedDifVals = '1234567890-+'.split('');

  const editLeg = () => {
    setEdit(!edit);
  };

  const addLeg = () => {
    setAdd(!add);
  };

  const startMarking = () => {
    setMarking(!marking);
  };

  const onDiff = (e) => {
    setDiff(e.target.value);
  };

  const editDiff = (leg) => {

    if((diff.length > 1 || diff === '0')  && diff.split('').every((char) => {return allowedDifVals.indexOf(char) !== -1 })) {
      axios.put('/dif', {dif: diff, legID: leg.id})
     .then((data) => {
      update();
     })
     .catch((err) => {
      console.log('error updating difference: ', err);
     })
    } else {
      alert(`time difference can only contain numbers, - , and +, and contain + or - unless 0. For reference: ${allowedDifVals}`)
    }


  };

  return (
    <div id='leg-feed'>
      {legs.map((leg, i) => {
        return (<div className="accordion-fake-title" key={i}>{marking && <button onClick={() => { completed(leg.id); }}>complete</button>}<Accordion
          complete={leg.complete}
          title={<div>{` Leg ${leg.id} | ${leg.start_time} | ${leg.end_time} | ${leg.dif}`}</div>}
          content={
            <div>
              <h1>{leg.runner}</h1>
              <h2>{`${leg.distance} miles`}</h2>
              <h2>Pace: {leg.pace}</h2>
              {organizer && <div>
                <button onClick={editLeg}>Edit Leg</button>
                {/* <button onClick={} >Delete Leg</button> */}
                </div>}
              {edit && <LegForm close={ () => { editLeg(); }} edit={edit} update={update} legID={leg.id} />}

              {organizer &&
              <div>
                <input type="text" placeholder="ex. +1, for 1 minute slow" onChange={onDiff} />
                <button onClick={() => {editDiff(leg)}}>Update Difference</button>
              </div>}
            </div>
          }
        /></div>)
      })}
      {organizer && legs.length <= 32 && <button onClick={addLeg}>Add a New Leg</button>}
      {(organizer || runnerView) && <button onClick={startMarking}>Mark Leg Complete</button>}
      {add && <LegForm close={ () => { addLeg(); }} edit={edit} update={update} />}
    </div>

  )
}

export default Legs;