import React from 'react';
import {useState} from 'react';

const App = () => {
  const [showRunners, setShowRunners] = useState(false);

  const displayRunnerInfo = () => {
    setShowRunners(!showRunners);
  }


  return (
    <div>
      <h1>Welcome to the Virtual Relay</h1>
      <button onClick={displayRunnerInfo}>Runner Info</button>
      {showRunners && <div>modal here</div>}
    </div>
    );
  }

  export default App;