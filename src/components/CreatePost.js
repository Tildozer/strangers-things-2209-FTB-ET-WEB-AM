import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { loggedIn, postAPost } from '../api';

const CreatePost = (props) => {
  const { setMakeNewPost, token, setUser } = props
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  
  const handlePostSubmit = ev => {
    ev.preventDefault();
    const deliver = ev.target[4].value;
    const postObj = {
      post: {
        'title' : title ? title : 'N/A',
        'description' : description ? description : 'N/A',
        'price' : price ? price : 'N/A',
        'location' : location ? location : '[On Request]',
        'willDeliver' : deliver,
      }
    }
    postAPost(postObj, token)
    .then(_ => loggedIn(token))
    .then(data => setUser(data))
    setMakeNewPost(false);
  }

  return (
    <form 
      className='create-post'
      onSubmit={ev => handlePostSubmit(ev)}
    >
        <div className='create-post-title'>Title :</div>
          <input 
            placeholder='Enter title...' 
            value={ title }
            onChange={ ev => setTitle(ev.target.value) }
          />
        <div className='create-post-title description'>Description :</div>
          <input
            placeholder='Enter description...'
            value={ description }
            onChange={ ev => setDescription(ev.target.value) }
          />
        <div className='create-post-title'>Price :</div>
          <input 
            placeholder='Enter price...'
            value={ price }
            onChange={ ev => setPrice(ev.target.value) }
          />
        <div className='create-post-title'>Location :</div>
          <input
            placeholder='Enter location...'
            value={ location }
            onChange={ev => setLocation(ev.target.value) }
          />
        <div>
            Will deliver?
        </div>
        <select>
            <option value={ false }>No</option>
            <option value={ true }>Yes</option>
        </select>
        <button>Create Post</button>
    </form>
  )
}

export default CreatePost;
