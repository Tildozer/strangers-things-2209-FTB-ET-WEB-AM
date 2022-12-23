import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePost, loggedIn } from '../../api';

const UserPosts = (props) => {
  const { user, setUser, editAPost, makeNewPost, setEditAPost, setEditPostObj, token } = props;
  const navigate = useNavigate();

  const handleDelete = async (post) => {
    return await deletePost(post._id, token)
      .then( _ => loggedIn(token))
      .then(data => setUser(data))
    //  .then(_ => navigate('/dashboard'));
  };

  const handleEdit = (post) => {
    setEditAPost(true);
    setEditPostObj(post);
  };
  

  return (
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
                                onClick={ ev => handleEdit(post) }
                              >
                                Edit
                              </button>
                              <button
                                className='delete-button'
                                onClick={ ev => handleDelete(post) }
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
  )
}

export default UserPosts;
