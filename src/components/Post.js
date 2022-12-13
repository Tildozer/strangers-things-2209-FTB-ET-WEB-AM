import React, { Fragment } from 'react';

const Post = ({ posts }) => {
  return (
    <Fragment>
      {
        posts.length ?
          <div>
            {
              posts.map(post => {
                console.log(post);
                return (
                  <div key={ post._id } className='post'>
                    <h1 className='title-price'>{ post.title }</h1>
                    <h2 className='title-price'>Price: { post.price }</h2>
                    <div className='about-info'>
                      <div className='info-Post'>
                        <span>-Post by: { post.author.username }</span>
                        <span>-Location: { post.location }</span>
                        <span>-Will I deliver?: { post.willDeliver ? 'Yes!': 'No, sorry bud.'}</span>
                      </div>
                      <div className='description-Post'>
                        <span>-Description: { post.description }</span>
                        <span>-created on: {post.createdAt.slice(0, 10)}</span>
                        <span>at: {post.createdAt.slice(11, 16)}</span>
                        &nbsp;
                      </div>
                      <div className='messages-Post'>
                        <span>-Messages({post.messages.length}):</span>
                        {
                          post.messages.length ?
                            post.messages.map(message => {
                            })
                          : null
                        }
                        <a>Expand messages</a>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        : null
      }    
    </Fragment>
  );
}

export default Post;