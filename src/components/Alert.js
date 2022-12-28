import React, { useEffect } from 'react';
import { BsPersonCheckFill } from 'react-icons/bs';
import { BiMessageCheck } from 'react-icons/bi';

const Alert = (props) => {
  const { setAlert, alertMessage, setAlertMessage, isUserLoggingIn, setIsUserLoggingIn } = props;

  useEffect(() => {
  setTimeout(() => {
    setAlert(false);
    setAlertMessage('');
    setIsUserLoggingIn(false);
  }, 4000);
  }, [])

  return (
    <div className='alert flex-columns'>
      <button 
        className='small-btn'
        onClick={_ => setAlert(false)}
      >
        X
      </button>
      <span>
        {
          isUserLoggingIn ?
            <BsPersonCheckFill />
          : <BiMessageCheck />
        }
        &nbsp;
        { alertMessage }
      </span>
      
    </div>
  )
}

export default Alert;
