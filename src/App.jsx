import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Accordion from './accordion.js';
import ProgressBar from './progress.js';
import RunnersInfo from './runners.js';
import Legs from './legs.js';
import '../public/app.css';
import TimeField from './time.js';

const App = () => {
  const [showRunners, setShowRunners] = useState(false);
  const [runners, setRunners] = useState([]);
  const [legs1, setLegs1] = useState([]);
  const [legs2, setLegs2] = useState([]);
  const [completeLegs, setCompleteLegs] = useState([]);//figure out how to double
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

  // const getLegInfo = () => {
  //   axios.get('/legs')
  //     .then((res) => {
  //       let sorted = res.data.sort(function compareFn(a, b) {
  //         if (a.id < b.id) {
  //           return -1;
  //         }
  //         if (a.id > b.id) {
  //           return 1;
  //         }
  //         return 0;
  //       })
  //       setLegs(sorted);
  //       setCompleteLegs(sorted.filter((leg) => { return leg.complete }))
  //     })
  //     .catch((err) => {
  //       console.log('error getting leg info: ', err);
  //     })
  // };

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
        //setCompleteLegs(sorted.filter((leg) => { return leg.complete }))
      })
      .catch((err) => {
        console.log('error getting leg info: ', err);
      })
  };

  // const updateStatus = (leg) => {
  //   axios.put('/:leg/complete', {'leg': leg})
  //     .then((res) => {
  //       getLeg1Info();
  //       getLeg2Info();
  //     })
  //     .catch((err) => {
  //       console.log('error updating leg completion');
  //     })
  // };
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

      {(runner || organizer) && <button onClick={displayRunnerInfo}>Runner Info</button>}
      {showRunners && <RunnersInfo runners={runners} close={() => { displayRunnerInfo(); }}
      update={() => { getRunnerInfo(); getLeg1Info(); getLeg2Info();}} organizer={organizer} />}


      <h2>Race Details</h2>

      {/* <div class="flipswitch">
        <input checked="" id="fs" class="flipswitch-cb" name="flipswitch" type="checkbox"/>
          <label for="fs" class="flipswitch-label">
            <div class="flipswitch-inner"></div>
            <div class="flipswitch-switch"></div>
          </label>
      </div> */}

      <Accordion
      title={'Leg # | Runner | Start | Finish | Race Difference'}
      content={'The Start column contains the expected start time. The Finish column contains the expected finish time. The Race Difference column contains the difference from the actual race time to the expected race time.'}
      />

      <Legs legs={legs1} completed={(leg) => { updateStatus1(leg); }} update={() => {getLeg1Info(); getLeg2Info();}}
      organizer={organizer} runnerView={runner} secondHalf={false} />

      <Accordion
      title={'------------ NIGHT BREAK ------------'}
      content={'hopefullly goes at the break'}
      />
      <Legs legs={legs2} completed={(leg) => { updateStatus2(leg); }} update={() => {getLeg1Info(); getLeg2Info();}}
      organizer={organizer} runnerView={runner} secondHalf={true}/>

      {organizer && <TimeField legs={legs1} update={() => { getLeg1Info(); getLeg2Info();}} runners={runners} secondHalf={false} />}
      {organizer && <TimeField legs={legs2} update={() => { getLeg1Info(); getLeg2Info();}} runners={runners} secondHalf={true} />}

      <h2>Who Is Veiwing?</h2>
      <button onClick={runnerViewing}>Runner</button>
      <button onClick={organizerViewing}>Organizer</button>
    </div>
    );
  };

  export default App;

  /*
  minimal wrap to dos
  individual runner log in and my log in (maybe login button instead of whose viewing section)
  time zones handled easier in db on client/server side
  store variables in browser for one time login?

  */
 /*
 project priotity list?
 port
 bus
 this
 */

 /*
 port tech reqs
 pages - react router
 static?/ no user input, but maybe interaction - next js?
 themes drop down for more viewing experiences, from standard to stark esk

 */