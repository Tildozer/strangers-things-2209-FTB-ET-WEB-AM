import React, { useState } from 'react';

const Register = () => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerNotValid, setRegisterNotValid] = useState(false);
  const [registerError, setRegisterError] = useState('');

  return (
    <div>
      
      <form
        className='register-form'
        onSubmit={ ev => {
          ev.preventDefault();
        }}
      >
        <h1>Let's become a little less of a stranger!</h1>
        <h3>Please remember the info you put below. 
          <br /> 
          You will need this everytime you want to login.
        </h3>
        <input
          className='user-name'
          placeholder='Create Username...'

        />
        <input
          className='password'
          placeholder='Create Username...'
        />
        <button>Register info</button>
      </form>
    </div>
  );
}

export default Register;
