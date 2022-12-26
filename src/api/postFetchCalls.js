const MAIN_URL = `https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/`;

export const fetchPost = async (userToken) => {
  return await fetch(`${MAIN_URL}posts`, {
    header: {
      'Content-type': 'Application/json',
      'Authorization': `Bearer ${userToken}`,
    }
  })
  .then(res =>  res.json())
  .then(data => data)
  .catch(err => console.error(err));
}

export const postAPost = async (submitObj, userToken) => {
  return (
    await fetch(`${MAIN_URL}posts`, {
      method: 'POST',
      headers: {
      'Content-type': 'Application/json',
      'Authorization': `Bearer ${userToken}`,
      },
      body: JSON.stringify(submitObj),
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.error(err))
  );
}

export const updatePost = async (postEditObj, userToken, postId ) => {
  return (
    await fetch(`${MAIN_URL}posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'Application/json',
        'Authorization' : `Bearer ${userToken}`,
      },
      body: JSON.stringify(postEditObj),
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.error(err))
  );
}

export const deletePost = async (postId, userToken) => {
  return (
    await fetch(`${MAIN_URL}posts/${postId}`, { 
      method: 'DELETE',
      headers: {
        'Content-type' : 'Application/json',
        'Authorization' : `Bearer ${userToken}`
      }, 
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.error(err))
  );
}

export const sendPostMessage = async (postId, token, messageObj) => {
  return (
    await fetch(`${MAIN_URL}/posts/${postId}/messages`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify(messageObj)
    })
    .then( response => response.json())
    .then(data => data)
    .catch(err => console.error(err))
  )
} 