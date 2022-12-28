import React from 'react';
import { Navigate } from 'react-router-dom';

const Logout = () => {

  window.localStorage.removeItem('token');
  
  return <Navigate to='/login' />
}

export default Logout;
