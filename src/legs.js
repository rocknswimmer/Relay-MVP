import React from "react";
import Accordion from './accordion.js';

const Legs = (props) => {
  const {legs, completed} = props;


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
            </div>
          }
        /></div>)
      })}
    </div>

  )
}


export default Legs;