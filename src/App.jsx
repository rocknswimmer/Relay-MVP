import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
  const [showRunners, setShowRunners] = useState(false);
  const [runners, setRunners] = useState([]);

  useEffect(() => {
    getRunnerInfo();
  }, []);

  const displayRunnerInfo = () => {
    setShowRunners(!showRunners);
    console.log(runners);
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
      {showRunners && <div>modal here</div>}
    </div>
    );
  };

  export default App;