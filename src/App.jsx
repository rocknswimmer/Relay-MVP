import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from './modal.js';
import Accordion from './accordion.js';
import ProgressBar from './progress.js';
import RunnersInfo from './runners.js';
import Legs from './legs.js';

const App = () => {
  const [showRunners, setShowRunners] = useState(false);
  const [runners, setRunners] = useState([]);
  const [legs, setLegs] = useState([]);
  const [completeLegs, setCompleteLegs] = useState([]);

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
        setCompleteLegs(sorted.filter((leg) => { return leg.complete }))
      })
      .catch((err) => {
        console.log('error getting leg info: ', err);
      })
  };

  const updateStatus = (leg) => {
    axios.put('/:leg/complete', {'leg': leg})
      .then((res) => {
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
      {showRunners && <RunnersInfo runners={runners} close={() => { displayRunnerInfo(); }}/>}
      <h2>Race Details</h2>
      <Legs legs={legs} completed={(leg) => { updateStatus(leg); }} />
      <ProgressBar bgcolor={"#ef6c00"} completed={(completeLegs.length/legs.length) * 100} />
    </div>
    );
  };

  export default App;