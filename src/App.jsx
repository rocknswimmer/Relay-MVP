import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
// import Modal from './modal.js';
import Accordion from './accordion.js';
import ProgressBar from './progress.js';
import RunnersInfo from './runners.js';
import Legs from './legs.js';
import '../public/app.css';

const App = () => {
  const [showRunners, setShowRunners] = useState(false);
  const [runners, setRunners] = useState([]);
  const [legs, setLegs] = useState([]);
  const [completeLegs, setCompleteLegs] = useState([]);
  const [runner, setRunner] = useState(false);
  const [organizer, setOrganizer] = useState(false);

  const runnerViewing = () => {
    setRunner(!runner);
  };

  const organizerViewing = () => {
    setOrganizer(!organizer);
  };

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
        let sorted = res.data.sort(function compareFn(a, b) {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        })
        setRunners(sorted);
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
      <ProgressBar bgcolor={"#ef6c00"} completed={(completeLegs.length/legs.length) * 100} />

      {(runner || organizer) && <button onClick={displayRunnerInfo}>Runner Info</button>}
      {showRunners && <RunnersInfo runners={runners} close={() => { displayRunnerInfo(); }}
      update={() => { getRunnerInfo(); getLegInfo();}} organizer={organizer} />}


      <h2>Race Details</h2>
      {/* <Accordion
      title={'Leg # | Start | Finish | Difference From Expected'}
      content={'couldnt think of a better way to do the break down quickly'}
      /> */}

      <Legs legs={legs} completed={(leg) => { updateStatus(leg); }} update={() => { getLegInfo();}}
      organizer={organizer} runnerView={runner} />

      <h2>Whose Veiwing?</h2>
      <button onClick={runnerViewing}>Runner</button>
      <button onClick={organizerViewing}>Organizer</button>
    </div>
    );
  };

  export default App;