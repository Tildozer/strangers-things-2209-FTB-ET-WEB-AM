import React, {useEffect, useState, } from 'react'
import { loggedIn, updatePost } from '../api';

const EditPost = (props) => {
    const { editPostObj, setEditPostObj, setEditAPost, token, setUser, getPosts, pathName } = props;
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editLocation, setEditLocation] = useState('');

    const handleSubmit = async ev => {
      ev.preventDefault();
      const deliver = ev.target[4].value;
      const newPost = {
        post: {
          'title': editTitle ? editTitle : editPostObj.title,
          'description': editDescription ? editDescription : editPostObj.description,
          'price' : editPrice ? editPrice : editPostObj.price,
          'location' : editLocation ? editLocation : editPostObj.location,
          'willDeliver': deliver,
        }
      }
      await updatePost(newPost, token, editPostObj._id)
      .then(_ => loggedIn(token))
      .then(data => setUser(data));
      if(pathName === '/posts'){
        getPosts();
      }
      setEditAPost(false);
      setEditPostObj({});
    }

    useEffect(() => {
      setEditTitle(`${editPostObj.title}`);
      setEditDescription(`${editPostObj.description}`);
      setEditPrice(`${editPostObj.price}`);
      setEditLocation(`${editPostObj.location}`);
    }, []);
  return (
    <form 
      className='create-post'
      onSubmit={ev => handleSubmit(ev)}
    >
        <div className='create-post-title'>Title :</div>
          <input 
            placeholder='Enter title...' 
            value={ editTitle }
            onChange={ ev => setEditTitle(ev.target.value) }
          />
        <div className='create-post-title description'>Description :</div>
          <input
            placeholder='Enter description...'
            value={ editDescription }
            onChange={ ev => setEditDescription(ev.target.value) }
          />
        <div className='create-post-title'>Price :</div>
          <input 
            placeholder='Enter price...'
            value={ editPrice }
            onChange={ ev => setEditPrice(ev.target.value) }
          />
        <div className='create-post-title'>Location :</div>
          <input
            placeholder='Enter location...'
            value={ editLocation }
            onChange={ev => setEditLocation(ev.target.value) }
          />
        <div>
            Will deliver?
        </div>
        <select>
            <option value={ false }>No</option>
            <option value={ true }>Yes</option>
        </select>
        <button className='edit-button'>Edit post</button>
    </form>
  )
}

export default EditPost;
