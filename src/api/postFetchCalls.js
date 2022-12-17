const MAIN_URL = `https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/`;

export const fetchPost = async () => {
 return await fetch(`${MAIN_URL}posts`)
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
    .then(data => console.log(data))
    .catch(err => console.error(err))
  );
}

export const updatePost = async (postEditObj, userToken, ) => {
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
    .then(data => console.log(data))
    .catch(err => console.error(err))
  );
  /* postEditObj
    post: {
      title: "My favorite stuffed animal",
      description: "This is a pooh doll from 1973. It has been carefully taken care of since I first got it.",
      price: "$480.00",
      location: "New York, NY",
      willDeliver: true
    } */
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
    .then(data => console.log(data))
    .catch(err => console.error(err))
  );
}
