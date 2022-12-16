import React, { useEffect, Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';

const Dashboard = (props) => {
  const { user, setUser, loggedIn, token } = props

  useEffect(() => {
    loggedIn(token)
    .then(user => setUser(user))
  }, [])
  return (
    user._id ?
      <div>
        <h1>Hello { user.username }! please enjoy your time here! </h1>
        <form
          onSubmit={ ev => {
            ev.preventDefault();
          }}
        >
          <button>Create new post</button>
          <div>
            {
              user.messages.length ?
                user.messages.map(message => console.log(message))
              : <h2>Sorry, you've got no messages at the moment.</h2>
            }
          </div>
        </form>
      </div>
    :null
  )
}

export default Dashboard;
