import React, { useEffect, } from 'react'

const SendMessage = (props) => {
  const { singlePost, getPosts, posts, setSinglePost } = props;
  
  console.log(singlePost)

  useEffect(() => {
  }, [])
  return (
    <div>
      <div>
        <h1>{ singlePost.title }</h1>
        <h2>Price: { singlePost.price }</h2>
        <p>-Post by: { singlePost.author.username }</p>
        <p>-Location : { singlePost.location }</p>
        <p>-Will I deliver?: { singlePost.willDeliver ? 'Yes!' : 'No, sorry bud.' }</p>
        <p>-Description: { singlePost.description }</p>
        <p>-Created on{ singlePost.createdAt.slice(0, 10) }</p>
        <p>at: { singlePost.createdAt.slice(11, 16) }</p>
      </div>
      <form>
        <textarea className='message-input' placeholder='Enter message here...'/>
        <button>Send message</button>
      </form>
    </div>
  )
}

export default SendMessage;
