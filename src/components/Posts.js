import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loggedIn } from '../api/index.js';

const Posts = (props) => {
  const { posts, getPosts, token, user, setUser, setEditAPost, editAPost } = props;
  const [searchPhrase, setSearchPhrase] = useState('');
  const navigate = useNavigate();
  
  const loggedInCheck = async () => {
    if(token){
      const userInfo = await loggedIn(token);
      setUser(userInfo);
    };
  }

  const handlePostClick = (post) => {
    navigate(`/single-post/${ post._id }`);
  }

  let postSearchFilter = posts.filter(post => post.description.toLowerCase().includes(searchPhrase.toLowerCase()) 
    || post.title.toLowerCase().includes(searchPhrase.toLowerCase()) 
    || post.location.toLowerCase().includes(searchPhrase.toLowerCase()) 
    || post.author.username.toLowerCase().includes(searchPhrase.toLowerCase()));

  useEffect(() => {
    loggedInCheck();
    getPosts(token);
    setEditAPost(false);
  }, []);

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
                onChange={ ev => setSearchPhrase(ev.target.value) }
                value={ searchPhrase }
              />
            </div>
            </form>
            {
              postSearchFilter.length ?
                postSearchFilter.map(post => {
                return (
                  <Fragment key={ post._id }>
                    <div className='post flex-columns'>
                      <h1 className='title-price'>{ post.title }</h1>
                      <h2 className='title-price'>Price: { post.price }</h2>
                      <div className='about-info'>
                        <div className='post-info'>
                          <span>-Post by: { post.author.username }</span>
                          <span>-Location: { post.location }</span>
                          <span>-Will I deliver?: { post.willDeliver ? 'Yes!': 'No, sorry bud.' }</span>
                        </div>
                        <div className='post-description'>
                          <span>-Description: { post.description }</span>
                          <span>-Created on: { post.createdAt.slice(0, 10) }</span>
                          <span>at: { post.createdAt.slice(11, 16) }</span>
                          &nbsp;
                        </div>
                        {
                          token ?
                            post.author._id === user._id ?
                              <div className='post-edit'>
                                {
                                  editAPost ?
                                    null
                                  : <button 
                                      className='edit-button'
                                      onClick={ ev => handlePostClick(post) }
                                      value={ post._id }
                                    >
                                      Edit
                                    </button>
                                }
                              </div>
                            : <div className='post-message'>
                                <button 
                                  onClick={ ev => handlePostClick(post) }
                                >
                                  Send message
                                </button>
                              </div>

                          : null
                        }
                    </div>
                  </div>
             
                </Fragment>
                )
              })
            : <h2 className='no-results'>Sorry no post matched, try something else.</h2>
            }
          </div>
        : null
      }  
    </Fragment>
  );
}

export default Posts;