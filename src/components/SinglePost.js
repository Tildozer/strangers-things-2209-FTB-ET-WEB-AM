import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPostMessage } from '../api';

const SinglePost = (props) => {
  const { singlePost, getPosts, posts, token } = props;
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
    .then(_ =>navigate('/dashboard'));
  };

  return (
    <div className='whole-post-message'>
      <div className='single-post'>
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
        <form 
          className='message-form'
          onSubmit={ev => handleSubmit(ev)}
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
    </div>
  )
}

export default SinglePost;
