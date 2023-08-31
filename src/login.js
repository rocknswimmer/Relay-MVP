import React from "react";
import {useState} from 'react';

const LoginForm = (props) => {
  const [runner, setRunner] = useState('');

  /*
  once input sanitized, maybe runner number is from a drop down instead of input
  localStorage.runner = runner
  add conditional for marking that leg.runner = runner
  */

  return (

      <div>
        <label>User Name</label>
        <input type='text' placeholder='ex. coolRunner23' onChange={console.log("probs better practice")}/>
        <br/>
        <label>Password</label>
        <input type='text' placeholder='ex. pass1234' onChange={console.log("probs better practice")}/>
        <br/>
        <button onClick={console.log("need submit function")}>Login</button>
      </div>

  )
}

export default LoginForm;