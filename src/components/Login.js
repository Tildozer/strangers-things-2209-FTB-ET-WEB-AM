import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import{
  login,
  loggedIn,
} from '../api/fetchCalls.js'

const Login = (props) => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [wrongLogin, setWrongLogin] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  return (
    <div>
      <form 
        className='login-form'
        onSubmit={ ev => {
          ev.preventDefault();
          const username = ev.target[0].value;
          const password = ev.target[1].value;
          const loginObj = { 
            'user' : { 
              'username': username,
              'password': password,
            }
          }
          login(loginObj)
          .then(data => {
            if(data.success){
              loggedIn(data.data.token);
              setWrongLogin(false);
            } else {
              setLoginError(data.error.message);
              setWrongLogin(true);
            }
          });
        }}
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
