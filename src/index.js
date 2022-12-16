import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, Navigate} from 'react-router-dom';

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
} from './components/index.js';

const App = ()=> {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  
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
        posts={ posts }
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
              token={ token }
              setUser={ setUser }
              user={ user }
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
              />
            : <Navigate to='/login'/>
          }
        />
        <Route 
          path='/logout'
          element={ <Logout /> }
        />
      </Routes> 
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
