import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from './modal.js';
import Accordion from './accordion.js';

const App = () => {
  const [showRunners, setShowRunners] = useState(false);
  const [runners, setRunners] = useState([]);

  useEffect(() => {
    getRunnerInfo();
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
    </div>
    );
  };

  export default App;