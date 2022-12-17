import React, { useEffect, useState, Fragment } from 'react';
import { CreatePost } from './index.js'

const Dashboard = (props) => {
  const { user, setUser, loggedIn, token } = props
  const [makeNewePost, setMakeNewPost] = useState(false);

  useEffect(() => {
    loggedIn(token)
    .then(user => setUser(user))
  }, [])
  return (
    user._id ?
      <div className='dashboard'>
        <h1>Hello { user.username }! welcome back, please enjoy your time here! 
          </h1>
          {
            makeNewePost ?
            <Fragment>
              <button
                className='exit-make-post'
                onClick={_ => setMakeNewPost(false)}
              >
                Exit post creation.
              </button>
              <CreatePost 
                setMakeNewPost={ setMakeNewPost }
                token={ token }
              />
              <form
                onSubmit={ev => handleSubmit(ev) }
              >
              </form>
            </Fragment> 
            : <button 
                className='make-post'
                onClick={_ => setMakeNewPost(true)}
              >
                Create new Post
              </button>
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
