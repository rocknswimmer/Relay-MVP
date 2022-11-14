import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
  const [showRunners, setShowRunners] = useState(false);

  useEffect(() => {
    getRunnerInfo();
  }, []);

  const displayRunnerInfo = () => {
    setShowRunners(!showRunners);
  };

  const getRunnerInfo = () => {
    axios.get('/runners')
      .then((res) => {
        console.log(res);
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