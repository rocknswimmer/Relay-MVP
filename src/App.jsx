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
import ImageContainer from './imageContainer.js';

const App = () => {
  const [legs1, setLegs1] = useState([]);
  const [legs2, setLegs2] = useState([]);
  const [completeLegs, setCompleteLegs] = useState([]);
  const [runner, setRunner] = useState(true);
  const [organizer, setOrganizer] = useState(false);// adjust to input time
  const [marking, setMarking] = useState(false);
  //const [pacific, setPacific] = useState(false);
  const possible = "1 2 3 4 5 6 7 8 9 10 11 12".split(" ");
  const secret = false;
  const running = false;

  const runnerViewing = () => {
    setRunner(false);
    setTimeout(() => {setRunner(true);}, "0");//toggle marking button on login

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

  const timeChange = () => {
    localStorage.timezone = localStorage.timezone === "pacific" ? "" : "pacific";
    //setTimeout(() => {localStorage.timezone = localStorage.timezone === "pacific" ? "" : "pacific";}, "1000");
    runnerViewing();

  }

  return (
    <div id="app">
      <h1>Waileys 2023</h1>
      {running && <ProgressBar bgcolor={"#ef6c00"} completed={(completeLegs.length/(legs1.length + legs2.length)) * 100} gif={true} />}
      <ProgressBar bgcolor={"#ef6c00"} completed={(completeLegs.length/(legs1.length + legs2.length)) * 100} gif={false} />

      {/* photos here  */}
      <ImageContainer progress={(completeLegs.length/(legs1.length + legs2.length)) * 100} secret={secret} />


      <h2>Race Details</h2>
      <h3>{localStorage.timezone === "pacific" ? "Pacific Time" : "Eastern Time"}</h3>

      {/* {!running && <p className="disabled-message">marking button currently disabled to prevent early unlocks</p>} */}

      <div className="button-container">
        {/* running && */}
      {(possible.indexOf(localStorage.runner) !== -1) && <button onClick={startMarking}>Mark Leg Complete!</button>}


      {/* proper update on click for button and time displayed change */}
      {runner && <button onClick={timeChange} >{`Switch to ${localStorage.timezone === "pacific" ? "Eastern" : "Pacific"}`}</button>}
      </div>

      <Accordion
      title={'Leg # | Runner | Start | Finish | Race Difference'}
      content={'The Start column contains the expected start time. The Finish column contains the expected finish time. The Race Difference column contains the difference from the actual race time to the expected race time.'}
      even={true}
      />

      <Legs legs={legs1} completed={(leg) => { updateStatus1(leg); }} update={() => {getLeg1Info(); getLeg2Info();}}
      organizer={organizer} runnerView={runner} secondHalf={false}  marking={marking}  />

      <Accordion
      title={'------------ NIGHT BREAK ------------'}
      content={<div><LoginField update={runnerViewing} /></div>}
      even={false}
      />
      <Legs legs={legs2} completed={(leg) => { updateStatus2(leg); }} update={() => {getLeg1Info(); getLeg2Info();}}
      organizer={organizer} runnerView={runner} secondHalf={true} marking={marking} />

      {organizer && <TimeField legs={legs1} update={() => { getLeg1Info(); }} secondHalf={false} />}
      {organizer && <TimeField legs={legs2} update={() => { getLeg2Info(); }} secondHalf={true} />}

    </div>
    );
  };

  export default App;