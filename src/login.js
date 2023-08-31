import React from "react";
import {useState} from 'react';

const LoginForm = (props) => {
  const {update} = props;
  const [runner, setRunner] = useState('');
  const [pass, setPass] = useState('');
  const allowed = 'abcdefghijklmnopqrstuvqxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

  /*
  once input sanitized, maybe runner number is from a drop down instead of input
  localStorage.runner = runner
  add conditional for marking that leg.runner = runner

  */

  const onRunner = (e) => {
    if(e.target.value.split('').every((char) => {return allowed.indexOf(char) !== -1 })){
      setRunner(e.target.value);
    } else {
      alert('User can only contain letters and numbers');
    }

  };

  const onPass = (e) => {
    if(e.target.value.split('').every((char) => {return allowed.indexOf(char) !== -1 })){
      //will need to salt and hash, maybe even before this part ...
      setPass(e.target.value);
    }  else {
      alert('Password can only contain letters and numbers');
    }

  };

  const onLogin = () => {
    if(pass === "test"){
      localStorage.runner = runner; // need to sanitaize
      update();
    }
  }

  return (

      <div>
        <label>User</label>
        <input type='text' placeholder='ex. coolRunner23' onChange={onRunner}/>
        <br/>
        <label>Password</label>
        <input type='text' placeholder='ex. pass1234' onChange={onPass}/>
        <br/>
        <button onClick={onLogin}>Login</button>
      </div>

  )
}

export default LoginForm;