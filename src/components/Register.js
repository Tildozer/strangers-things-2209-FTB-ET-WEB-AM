import React, { useState } from 'react';
import {
  registerUser,
  loggedIn,
} from '../api/index.js';

const Register = (props) => {
  const { setUser, user } = props;
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerNotValid, setRegisterNotValid] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const handleSubmit = ev => {
    ev.preventDefault();
    const registerObj = {
      user: {
        'username': registerUsername,
        'password': registerPassword,
      },
    }
    registerUser(registerObj)
    .then(data => {
      if(data.success){
        const token = data.data.token;
        loggedIn(token);
        setUser(data.data);
        window.localStorage.setItem('token', token);
        setRegisterNotValid(false);
      } else {
        setRegisterError(data.error.message);
        setRegisterNotValid(true);
      }
    })
  }

  return (
    <div>
      
      <form
        className='register-form'
        onSubmit={ev => handleSubmit(ev) }
      >
        <h1>Let's become a little less of a stranger!</h1>
        {
          registerNotValid ?
            <h3>{ registerError }</h3>
          :
            <h3>Please remember the info you put below. 
              <br /> 
              You will need this everytime you want to login.
            </h3>
        }
        <input
          className='user-name'
          placeholder='Create Username...'
          onChange={ev => setRegisterUsername(ev.target.value)}
          value={ registerUsername }
        />
        <input
          className='password'
          placeholder='Create Username...'
          type='password'
          onChange={ev => setRegisterPassword(ev.target.value)}
          value={ registerPassword }
        />
        <button>Register info</button>
      </form>
    </div>
  );
}

export default Register;
