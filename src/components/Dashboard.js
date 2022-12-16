import React, { useEffect, Fragment } from 'react';

const Dashboard = (props) => {
  const { user, setUser, loggedIn, token } = props

  useEffect(() => {
    loggedIn(token)
    .then(user => setUser(user))
  }, [])
  return (
    <div>
        <h1>{ user.username }</h1>
    </div>
  )
}

export default Dashboard;
