import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePost, loggedIn, sendPostMessage } from '../api';
import EditPost from './EditPost';

const SinglePost = (props) => {
  const { singlePost, token, user, setUser, editAPost, setEditAPost, editPostObj, setEditPostObj, setAlert, setAlertMessage } = props;
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    return navigate('/login');
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const messageObj = {
      'message': {
        'content': message
      }
    }
    sendPostMessage(singlePost._id, token, messageObj)
    .then(_ => {
      setAlert(true);
      setAlertMessage(`Message sent on post: ${singlePost.title}`)
    })
    .then(_ => navigate('/dashboard'));
  };

  const handleEdit = () => {
    setEditAPost(true);
    setEditPostObj(singlePost);
  };

  const handleDelete = async () => {
    await deletePost(singlePost._id, token)
    .then( _ => loggedIn(token))
    .then(data => {
      setAlert(true);
      setAlertMessage(`${ singlePost.title } has been deleted.`);
      setUser(data);
    })
    .catch(err => console.error(err));
    navigate('/dashboard');
  };

  useEffect(() => {
    if(token){
      loggedIn(token)
      .then(user => setUser(user))
    }
  }, [])
  
  return (
    <div className='whole-post-message flex-columns'>
      <div className='single-post flex-columns'>
        <div>
          <h1>{ singlePost.title }</h1>
          <h2>Price: { singlePost.price }</h2>
        </div>
        <div className='single-post-info'>
          <p>-Post by: { singlePost.author.username }</p>
          <p>-Location : { singlePost.location }</p>
          <p>-Will I deliver?: { singlePost.willDeliver ? 'Yes!' : 'No, sorry bud.' }</p>
          <p>-Created on { singlePost.createdAt.slice(0, 10) }</p>
          <p>at: { singlePost.createdAt.slice(11, 16) }</p>
        </div>
          <p>-Description: { singlePost.description }</p>
      </div>
     {

      token ?
        user._id === singlePost.author._id ?
          editAPost ?
            null  
          : <div>
            <button 
              className='edit-button'
              onClick={ ev => handleEdit() }
            >
              Edit post
            </button>
            <button
              className='delete-button'
              onClick={ ev => handleDelete() }
            >
              Delete post
            </button>
          </div>
        : <form 
          className='message-form flex-columns'
          onSubmit={ ev => handleSubmit(ev)}
        >
          <label>let { singlePost.author.username } know your interested in their '{ singlePost.title }' today!</label>
          <textarea
            className='message-input' 
            placeholder='Enter message here...'
            onChange={ev => setMessage(ev.target.value)}
            value={ message }
          />
          <button>Send message</button>
        </form>
      : <button className='message-login' onClick={ev => handleClick()}>Login to send a message!</button>
    }
    {
      editAPost ?
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
            setAlert={ setAlert }
            setAlertMessage={ setAlertMessage }
        /> 
       </Fragment>
     : null
    }
    </div>
  )
}

export default SinglePost;
