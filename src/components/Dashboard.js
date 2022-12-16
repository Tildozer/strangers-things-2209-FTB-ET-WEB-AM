import React, { useEffect, useState, Fragment } from 'react';

const Dashboard = (props) => {
  const { user, setUser, loggedIn, token } = props
  const [makeNewePost, setMakeNewPost] = useState(false)

  const handleSubmit = ev => {
    ev.preventDefault();
  }

  useEffect(() => {
    loggedIn(token)
    .then(user => setUser(user))
  }, [])
  return (
    user._id ?
      <div className='dashboard'>
        <h1 className='dash-greeting'>Hello { user.username }! welcome back, please enjoy your time here! 
        
        <form
          onSubmit={ev => handleSubmit(ev) }>
          <button className='make-post-redirect'>Create new post</button>
          </form>
          </h1>
          {
            makeNewePost ? 
              <form>
                
              </form>
            : null
          }
          <div className='dash-post'>
            {
              user.posts.length ?
                user.posts.map(post => console.log(post))
              : <h2>Looks, like you haven't made a post yet, let's change that!</h2>
            }
          </div>
          <div className='dash-messages'>
            {
              user.messages.length ?
                user.messages.map(message => console.log(message))
              : <h2>Sorry, you've got no messages at the moment.</h2>
            }
          </div>
       
      </div>
    :null
  )
}

export default Dashboard;
