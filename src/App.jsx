import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from './modal.js';
import Accordion from './accordion.js';

const App = () => {
  const [showRunners, setShowRunners] = useState(false);
  const [runners, setRunners] = useState([]);
  const [legs, setLegs] = useState([]);

  useEffect(() => {
    getRunnerInfo();
    getLegInfo();
  }, []);

  const displayRunnerInfo = () => {
    setShowRunners(!showRunners);
  };

  const getRunnerInfo = () => {
    axios.get('/runners')
      .then((res) => {
        setRunners(res.data);
      })
      .catch((err) => {
        console.log('error getting runner info: ', err);
      })
  };

  const getLegInfo = () => {
    axios.get('/legs')
      .then((res) => {
        let sorted = res.data.sort(function compareFn(a, b) {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          // a must be equal to b
          return 0;
        })
        setLegs(sorted);
      })
      .catch((err) => {
        console.log('error getting leg info: ', err);
      })
  };

  const updateStatus = (leg) => {
    console.log(leg);
    axios.put('/:leg/complete', {'leg': leg})
      .then((res) => {
        console.log('updated: ', leg, res);
        getLegInfo();
      })
      .catch((err) => {
        console.log('error updating leg completion');
      })
  };

  return (
    <div>
      <h1>Virtual Relay</h1>
      <button onClick={displayRunnerInfo}>Runner Info</button>
      {showRunners && <Modal
      close={() => { displayRunnerInfo(); }}
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
      />}
      <h2>Race Details</h2>
       <div>
          {legs.map((leg, i) => {
            return (<div className="accordion-fake-title" key={i}><button onClick={() => { updateStatus(leg.id); }}>complete</button><Accordion

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
    </div>
    );
  };

  export default App;