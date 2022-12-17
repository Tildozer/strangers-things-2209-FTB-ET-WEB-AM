import React, { useEffect, useState, Fragment } from 'react';
import { deletePost } from '../api/postFetchCalls.js';
import { CreatePost } from './index.js';

const Dashboard = (props) => {
  const { user, setUser, loggedIn, token } = props;
  const [makeNewePost, setMakeNewPost] = useState(false);

  useEffect(() => {
    loggedIn(token)
    .then(user => setUser(user));
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
                  setUser={ setUser }
                />
              </Fragment> 
            : <button 
                className='make-post'
                onClick={_ => setMakeNewPost(true)}
              >
                Create new Post
              </button>
          }
          <div className='dash-post-container'>
            <h1 className='dashboard-title'>Posts :</h1>
              {
                user.posts.length ?
                  user.posts.filter(post => post.active).length ?
                    user.posts.filter(post => post.active).map(post => {
                      return (
                        <div key={ post._id }>
                        <div className='dashboard-post'>
                          <h3>{post.title}</h3>
                          <h4>Price: { post.price }</h4>
                          <div>
                            <p>-Description: { post.description }</p>
                            <span>-created on: {post.createdAt.slice(0, 10)}</span>
                             &nbsp;
                            <span>at: {post.createdAt.slice(11, 16)}</span>
                          </div>
                          <div>
                            <button>Edit</button>
                            <button
                              onClick={async _ => {
                                await deletePost(post._id, token)
                                .then( _ => loggedIn(token))
                                .then(data => setUser(data))
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      )
                    })
                    : <h2>Looks, like you haven't made a post yet, let's change that!</h2>
                : <h2>Looks, like you haven't made a post yet, let's change that!</h2>
              }
          </div>
          <div className='dash-messages'>
              <h1 className='dashboard-title'>Messages :</h1>
              {
                user.messages.length ?
                  user.messages.map((message, idx) => {
                    return (
                      <Fragment>
                        <h3>{ message.title }</h3>
                      </Fragment>
                    )
                  })
                : <h2>Sorry, you've got no messages at the moment.</h2>
              }
          </div>
       
      </div>
    :null
  )
}

export default Dashboard;
