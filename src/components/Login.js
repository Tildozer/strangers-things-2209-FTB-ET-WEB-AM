import React, { useState, useEffect } from 'react';
import { Link, redirect } from 'react-router-dom';
import{ login } from '../api/index.js'

const Login = (props) => {
  const { setUser, user } = props
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [wrongLogin, setWrongLogin] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const addUserkey = (loginObj) => {
    login(loginObj)
    .then(data => {
      if(data.success){
        const token = data.data.token;
        const user = data.data;
        setUser(user);
        window.localStorage.setItem('token', token);
        setWrongLogin(false);
      } else {
        setLoginError(data.error.message);
        setWrongLogin(true);
      }
    });
  }

  const handleSubmit = ev => {
    ev.preventDefault();
    const loginObj = { 
      'user' : { 
        'username': loginUsername,
        'password': loginPassword,
      }
    }
    addUserkey(loginObj);
  }

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if(!token){
      setUser({});
    }
  }, [])
  return (
    
    <div>
      <form 
        className='login-form'
        onSubmit={ev => handleSubmit(ev)}
      >
        <h1>Welcome Stranger!</h1>
        <h3>Please submit your info below to login.</h3>
        <input 
          className='user-name'
          placeholder='Enter Username...'
          onChange={ev => setLoginUsername(ev.target.value)}
          value={ loginUsername } 
        />
        <input 
          className='password'
          placeholder='Enter Password...'
          type='password'
          onChange={ev => setLoginPassword(ev.target.value)}
          value={ loginPassword }
        />
        <div>
          <button>Enter password</button>
          <Link className='register-account' to='/register'>Need an account? register here.</Link>
        </div>
        {
          wrongLogin ? 
            <h6>{ loginError }</h6>
          : null
        }
      </form>
    </div>
  );
}

export default Login;
