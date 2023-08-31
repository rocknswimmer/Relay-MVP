import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Accordion from './accordion.js';
import ProgressBar from './progress.js';
import RunnersInfo from './runners.js';
import Legs from './legs.js';
import '../public/app.css';
import TimeField from './time.js';
import LoginField from './login.js';

const App = () => {
  const [legs1, setLegs1] = useState([]);
  const [legs2, setLegs2] = useState([]);
  const [completeLegs, setCompleteLegs] = useState([]);
  const [runner, setRunner] = useState(false);
  const [organizer, setOrganizer] = useState(false);
  const [marking, setMarking] = useState(false);

  const runnerViewing = () => {
    setRunner(!runner);
  };

  const organizerViewing = () => {
    setOrganizer(!organizer);
  };

  useEffect(() => {
    getLeg1Info();
    getLeg2Info();
  }, []);

  useEffect(() => {
    calcComplete();
  }, [legs1, legs2])

  const calcComplete = () => {
    let combined = legs1.concat(legs2);
    setCompleteLegs(combined.filter((leg) => { return leg.complete }))
  }

  const startMarking = () => {
    setMarking(!marking);
  };

  const getLeg1Info = () => {
    axios.get('/legs1')
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
        setLegs1(sorted);
      })
      .catch((err) => {
        console.log('error getting leg1 info: ', err);
      })
  };
  const getLeg2Info = () => {
    axios.get('/legs2')
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
        setLegs2(sorted);
      })
      .catch((err) => {
        console.log('error getting leg info: ', err);
      })
  };

  const updateStatus2 = (leg) => {
    axios.put('/:leg/complete2', {'leg': leg})
      .then((res) => {
        getLeg1Info();
        getLeg2Info();
      })
      .catch((err) => {
        console.log('error updating leg completion');
      })
  };
  const updateStatus1 = (leg) => {
    axios.put('/:leg/complete1', {'leg': leg})
      .then((res) => {
        getLeg1Info();
        getLeg2Info();
      })
      .catch((err) => {
        console.log('error updating leg completion');
      })
  };

  return (
    <div id="app">
      <h1>Virtual Relay</h1>
      <ProgressBar bgcolor={"#ef6c00"} completed={(completeLegs.length/(legs1.length + legs2.length)) * 100} />

      {(organizer || runner) && <button onClick={startMarking}>Mark Leg Complete!</button>}

      <h2>Race Details</h2>

      {/* Pacific switch here */}

      <Accordion
      title={'Leg # | Runner | Start | Finish | Race Difference'}
      content={'The Start column contains the expected start time. The Finish column contains the expected finish time. The Race Difference column contains the difference from the actual race time to the expected race time.'}
      />

      <Legs legs={legs1} completed={(leg) => { updateStatus1(leg); }} update={() => {getLeg1Info(); getLeg2Info();}}
      organizer={organizer} runnerView={runner} secondHalf={false}  marking={marking}  />

      <Accordion
      title={'------------ NIGHT BREAK ------------'}
      content={<div><LoginField  /></div>}
      />
      <Legs legs={legs2} completed={(leg) => { updateStatus2(leg); }} update={() => {getLeg1Info(); getLeg2Info();}}
      organizer={organizer} runnerView={runner} secondHalf={true} marking={marking} />

    </div>
    );
  };

  export default App;