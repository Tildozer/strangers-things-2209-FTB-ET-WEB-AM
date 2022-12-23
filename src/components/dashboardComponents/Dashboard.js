import React, { useEffect, useState, Fragment } from 'react';
import { deletePost } from '../../api/postFetchCalls.js';
import { CreatePost, EditPost, UserMessages, UserPosts } from '../index.js';

const Dashboard = (props) => {
  const { user, setUser, loggedIn, token, setEditAPost, editAPost, setEditPostObj, editPostObj } = props;
  const [makeNewPost, setMakeNewPost] = useState(false);
  
  const handleDelete = async (ev) => {
    await deletePost(id, token)
      .then( _ => loggedIn(token))
      .then(data => setUser(data));
  }

  const handleEdit = (_, post) => {
    setEditAPost(true);
    setEditPostObj(post);
  }

  useEffect(() => {
    loggedIn(token)
    .then(user => setUser(user));
    setEditAPost(false);
  }, [])
  // console.log(user)
  return (
    user._id ?
      <div className='dashboard'>
        <h1>Hello { user.username }! welcome back, please enjoy your time here! 
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
          <UserPosts 
            user={ user } 
            editAPost={ editAPost }
            makeNewPost={ makeNewPost }
          />
          <UserMessages user={ user }/>
      </div>
    :null
  );
}

export default Dashboard;
