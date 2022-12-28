import React, { useEffect, useState, Fragment } from 'react';
import { CreatePost, EditPost, UserMessages, UserPosts } from '../index.js';

const Dashboard = (props) => {
  const { user, setUser, loggedIn, token, setEditAPost, editAPost, setEditPostObj, editPostObj, posts, setAlert, setAlertMessage } = props;
  const [makeNewPost, setMakeNewPost] = useState(false);


  useEffect(() => {
    loggedIn(token)
    .then(user => setUser(user));
    setEditAPost(false);
  }, [])

  return (
    user._id ?
      <div className='dashboard flex-columns'>
        <h1>
          Hello { user.username }! welcome back, please enjoy your time here! 
        </h1>
          {
            makeNewPost ?
              <Fragment>
                <button
                  className='exit-make-post'
                  onClick={ _ => setMakeNewPost(false) }
                >
                  Exit post creation.
                </button>
                <CreatePost 
                  setMakeNewPost={ setMakeNewPost }
                  token={ token }
                  setUser={ setUser }
                  setAlert={ setAlert }
                  setAlertMessage={ setAlertMessage }
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
                  setAlert={ setAlert }
                  setAlertMessage={ setAlertMessage }
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
            setUser={ setUser}
            editAPost={ editAPost }
            makeNewPost={ makeNewPost }
            setEditAPost={ setEditAPost }
            setEditPostObj={ setEditPostObj }
            token={ token }
            setAlert={ setAlert }
            setAlertMessage={ setAlertMessage }
          />
          <UserMessages posts={ posts } user={ user }/>
      </div>
    :null
  );
}

export default Dashboard;
