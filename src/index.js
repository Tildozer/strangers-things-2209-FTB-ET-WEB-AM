import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate} from 'react-router-dom';

import {
  fetchPost, 
  loggedIn,
} from './api/index.js';

import {
 Post,
 Login,
 Logout,
 Register,
 Nav,
 Dashboard,
 EditPost,
} from './components/index.js';

const App = ()=> {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [editAPost, setEditAPost] = useState(false);
  const [editPostObj, setEditPostObj] = useState({});
  
  const token = window.localStorage.getItem('token');

  const getPosts = async () => {
    const data = await fetchPost();
    const posts = data.data.posts;
    setPosts(posts);
  }
  
  useEffect( ()=> {
    getPosts();
  }, [])
 
  return (
    <div>
      <h1 className='title'>Strangers Things</h1>
      <Nav 
        token={ token }
      />
      <Routes>
        <Route exact path='/'
          element={ <Navigate to='/login'/> }
        />
        <Route 
          path='/posts' 
          element= { 
            <Post 
              posts={ posts }
              getPosts={ getPosts }
              token={ token }
              user={ user }
              setUser={ setUser }
              setEditAPost={ setEditAPost }
              editAPost={ editAPost }
              setEditPostObj={ setEditPostObj}
              editPostObj={ editPostObj }
            /> 
          }  
        />
        <Route 
          path='/login' 
          element={ 
            token ?
              <Navigate to='/dashboard'/>
            : <Login
                setUser={ setUser }
                user={ user }
              /> 
          } 
        />
        <Route 
          path='/register' 
          element={ 
            token ?
              <Navigate to='/dashboard'/>
            : <Register 
                setUser={ setUser }
                user={ user }
              /> 
          } 
        />
        <Route
          path='/dashboard'
          element={
            token ?
              <Dashboard
                user={ user }
                setUser={ setUser }
                loggedIn={ loggedIn }
                token={ token }
                setEditAPost={ setEditAPost }
                editAPost={ editAPost }
                setEditPostObj={ setEditPostObj}
                editPostObj={ editPostObj }
              />
            : <Navigate to='/login'/>
          }
        />
        <Route 
          path='/logout'
          element={ <Logout /> }
        />
        <Route
          path='/edit-post'
          element={ <EditPost />}
        /> 
      </Routes> 
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
