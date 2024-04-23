import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Accordion from './accordion.js';
import ProgressBar from './progress.js';
import RunnersInfo from './runners.js';
import Legs from './legs.js';
import '../public/app.css';
import TimeField from './time.js';
import ImageContainer from './imageContainer.js';
import DemoControls from './demoControls.js';

const App = () => {
  const [showRunners, setShowRunners] = useState(false);
  const [runners, setRunners] = useState([]);
  const [legs, setLegs] = useState([]);
  const [completeLegs, setCompleteLegs] = useState([]);
  const [runner, setRunner] = useState(false);
  const [organizer, setOrganizer] = useState(false);
  const [manualProgres, setManualProgres] = useState(0);

  const secret = true;

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

  const addProgress = () => {
    if(manualProgres < 100 ){
      setManualProgres(manualProgres + 10)
    }
    //console.log("add")
  }

  const subtractProgress = () => {
    if(manualProgres > 0 ){
      setManualProgres(manualProgres - 10)
    }
    //console.log("subtract")
  }

  const clearProgress = () => {
    axios.put('/clearProgress')
      .then((res) => {
        getLegInfo();
        setManualProgres(0);
      })
      .catch((err) => {
        console.log('error clearing progress');
      })
  }


  return (
    <div id="app">
      <h1>Virtual Relay</h1>
      <ProgressBar bgcolor={"#ef6c00"} completed={Math.max(manualProgres,(completeLegs.length/legs.length) * 100)} />

      <DemoControls progress={manualProgres} addProgress={() => {addProgress()}} subtractProgress={() =>{subtractProgress()}} clearProgress={() => {clearProgress()}}/>

      <ImageContainer progress={Math.max(manualProgres,(completeLegs.length/legs.length) * 100)} secret={secret} />



      <h2>Race Details</h2>

      {/* <div class="flipswitch">
        <input checked="" id="fs" class="flipswitch-cb" name="flipswitch" type="checkbox"/>
          <label for="fs" class="flipswitch-label">
            <div class="flipswitch-inner"></div>
            <div class="flipswitch-switch"></div>
          </label>
      </div> */}

      <Accordion
      title={'Leg # | Start | Finish | Race Difference'}
      content={'The Start column contains the expected start time. The Finish column contains the expected finish time. The Race Difference column contains the difference from the actual race time to the expected race time.'}
      />

      <Legs legs={legs} completed={(leg) => { updateStatus(leg); }} update={() => { getLegInfo();}}
      organizer={organizer} runnerView={runner} />

      {organizer && <TimeField legs={legs} update={() => { getLegInfo();}} runners={runners} />}

      {(runner || organizer) && <button onClick={displayRunnerInfo}>Runner Info</button>}
      {showRunners && <RunnersInfo runners={runners} close={() => { displayRunnerInfo(); }}
      update={() => { getRunnerInfo(); getLegInfo();}} organizer={organizer} />}

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