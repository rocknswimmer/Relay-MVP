import React from "react";
import {useState} from 'react';

const LoginForm = (props) => {
  const {update} = props;
  const [runner, setRunner] = useState('');
  const [pass, setPass] = useState('');
  const allowed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const salt = 'salt123';

  /*
  once input sanitized, maybe runner number is from a drop down instead of input
  localStorage.runner = runner
  add conditional for marking that leg.runner = runner

  */
  String.prototype.hashCode = function () {
    var hash = 0;
    for (var i = 0; i < this.length; i++) {
      var char = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

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
      setPass(e.target.value + salt);
    }  else {
      alert('Password can only contain letters and numbers');
    }

  };

  const onLogin = () => {
    if(pass.hashCode() === -458636246){
      localStorage.runner = runner;
      update();
      location.reload();
    } else {
      alert('Incorrect UserName or Password, please check your upper and lowercase letters and try again, or reach out for help')
    }
  }

  return (

      <div>
        <label>User:</label>
        <input type='text' placeholder='ex. coolRunner23' onChange={onRunner}/>
        <br/>
        <label>Password:</label>
        <input type='text' placeholder='ex. pass1234' onChange={onPass}/>
        <br/>
        <button onClick={onLogin}>Login</button>
      </div>

  )
}

export default LoginForm;