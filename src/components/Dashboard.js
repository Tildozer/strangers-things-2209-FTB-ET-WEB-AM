import React, { useEffect, useState, Fragment } from 'react';
import { deletePost } from '../api/postFetchCalls.js';
import { CreatePost, EditPost } from './index.js';

const Dashboard = (props) => {
  const { user, setUser, loggedIn, token, setEditAPost, editAPost, setEditPostObj, editPostObj } = props;
  const [makeNewPost, setMakeNewPost] = useState(false);
  
  const handleDelete = async (ev) => {
    await deletePost(id, token)
      .then( _ => loggedIn(token))
      .then(data => setUser(data));
  }

  const handleEdit = (ev, post) => {
    setEditAPost(true);
    setEditPostObj(post);
  }

  useEffect(() => {
    loggedIn(token)
    .then(user => setUser(user));
    setEditAPost(false);
  }, [])

  return (
    user._id ?
      <div className='dashboard'>
        <h1 className='dashboard-title'>Hello { user.username }! welcome back, please enjoy your time here! 
          </h1>
          {
            makeNewPost ?
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
              // start of second if statment.
            : editAPost ?
              <Fragment>
                <button
                  className='exit-make-post'
                  onClick={_ => setEditAPost(false)}
                >
                  Exit post edit.
                </button>
                <EditPost 
                  editPostObj={ editPostObj }
                  setEditPostObj={ setEditPostObj }
                  setEditAPost={ setEditAPost }
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
                    user.posts.filter(post => post.active).map((post, idx) => {
                      return (
                        <div  key={ post._id }>
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
                            {
                            editAPost || makeNewPost ?
                              null
                            : <Fragment>
                              <button
                                className='edit-button'
                                onClick={ ev => handleEdit(ev, post) }
                              >
                                Edit
                              </button>
                              <button
                                className='delete-button'
                                onClick={ev => handleDelete(ev)}
                              >
                                Delete
                              </button>
                            </Fragment>
                            }
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
                    console.log(message)
                    return (
                      <Fragment key={message._id}>
                        <h3>from: { message.fromUser.username }</h3>
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
