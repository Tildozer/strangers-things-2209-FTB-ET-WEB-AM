import React, { Fragment, useState, useEffect } from 'react';
import { loggedIn } from '../api/index.js';
import EditPost from './EditPost.js';

const Post = (props) => {
  const { posts, getPosts, token, setUser, user, setEditAPost, editAPost, setEditPostObj, editPostObj } = props;
  const [serachPhrase, setSearchPhrase] = useState([]);
  
  const loggedInCheck = async () => {
    if(token){
      const userInfo = await loggedIn(token);
      setUser(userInfo);
    };
  }

  const handleEdit = (ev, post) => {
    const id = ev.target.value;
    setEditAPost(true);
    setEditPostObj(post)
    }

  useEffect(() => {
    loggedInCheck();
    getPosts();
  }, []);

  // console.log(posts)
  // console.log(user)
  return (
    <Fragment>
      {
        posts.length ?
          <div>
            <form className='post-search'>
            <h1>Posts</h1>
            <div>
              <input
                placeholder='search posts...'
                onChange={ev => {
                  setSearchPhrase(ev.target.value);
                }}
                value={ serachPhrase }
              />
            </div>
            </form>
            {
              posts.map(post => {
                console.log(post)
                return (
                  <Fragment key={ post._id }>
                    {
                      editAPost && post._id === editPostObj._id ?
                        <Fragment>
                          <button
                            onClick={_ => setEditAPost(false) }
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
                      : null
                    }  
                    <div  className='post'>
                      <h1 className='title-price'>{ post.title }</h1>
                      <h2 className='title-price'>Price: { post.price }</h2>
                      <div className='about-info'>
                        <div className='post-info'>
                          <span>-Post by: { post.author.username }</span>
                          <span>-Location: { post.location }</span>
                          <span>-Will I deliver?: { post.willDeliver ? 'Yes!': 'No, sorry bud.'}</span>
                        </div>
                        <div className='post-description'>
                          <span>-Description: { post.description }</span>
                          <span>-created on: {post.createdAt.slice(0, 10)}</span>
                          <span>at: {post.createdAt.slice(11, 16)}</span>
                          &nbsp;
                        </div>
                        {
                          token ?
                            post.author._id === user._id ?
                              <div className='post-edit'>
                                <button 
                                  className='edit-button'
                                  onClick={ ev => handleEdit(ev, post)}
                                  value={ post._id }
                                >
                                  Edit
                                </button>
                              </div>
                            : <div className='post-message'>
                                <button>Send message</button>
                              </div>

                          : null
                        }
                    </div>
                  </div>
             
                </Fragment>
                )
              })
            }
          </div>
        : null
      };    
    </Fragment>
  );
}

export default Post;