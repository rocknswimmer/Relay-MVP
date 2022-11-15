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
        setLegs(res.data);
      })
      .catch((err) => {
        console.log('error getting leg info: ', err);
      })
  };

  return (
    <div>
      <h1>Welcome to the Virtual Relay</h1>
      <button onClick={displayRunnerInfo}>Runner Info</button>
      {showRunners && <Modal
      close={() => { displayRunnerInfo(); }}
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
                </div>
              }
            />)
          })}
        </div>
      }
      />}
       <div>
          {legs.map((leg, i) => {
            return (<Accordion
              key={i}
              title={`Leg ${leg.id}  |  ${leg.runner}`}
              content={
                <div>
                <h2>{leg.distance}</h2>
                </div>
              }
            />)
          })}
        </div>
    </div>
    );
  };

  export default App;