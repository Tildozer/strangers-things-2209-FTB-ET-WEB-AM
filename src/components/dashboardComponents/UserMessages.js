import React, { Fragment } from 'react';

const UserMessages = (props) => {
  const { posts, user } = props;
  // filter out messages that are on post that are not avaible anymore. 
  const postsIds = posts.map(post => post._id);
  const activePostCheck = user.messages.filter(message => postsIds.indexOf(message.post._id) !== -1)
  console.log('active',activePostCheck);
  return (
    <div className='dash-messages'>
    <h1>Messages :</h1>
    {
      user.messages.length ?
        <Fragment>
          <h1 className='dashboard-title'>Messages for you:</h1>
          {
            activePostCheck.filter(message => message.fromUser.username !== user.username ).map(message => {
              return (
                <div key={message._id} className='dash-message'>
                  <div className='message-info'>
                    <h2>Message from: <span className='message-username'>{ message.fromUser.username }</span></h2>
                    <h3>post: '{ message.post.title }'</h3>
                  </div>
                  <p>-{ message.content }</p>
                </div>
              );
            })
          }
            <h1 className='dashboard-title'>Messages from you:</h1>
          {
           activePostCheck.filter(message => message.fromUser.username === user.username ).map(message => {
             console.log(message)
              return (
                <a key={message._id} href={`#/single-post/${message.post._id}`}>
                  <div className='dash-message'>
                    <div>
                      <h3>post: '{ message.post.title }'</h3>
                      <p>-{ message.content }</p>
                    </div>
                  </div>
                </a>
              );
            })
          }
          </Fragment>
      : <h2>Sorry, you've got no messages at the moment.</h2>
    }
  </div>
  )
}

export default UserMessages;
