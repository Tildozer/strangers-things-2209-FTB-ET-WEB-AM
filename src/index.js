import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link} from 'react-router-dom';

import {
  fetchPost,
} from './api/fetchCalls.js';

import {
 Post,
 Login,
 Register,
 Nav,
} from './components/index.js';

const App = ()=> {
  const [posts, setPosts] = useState([]);

  
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
      <Nav posts={ posts }/>
      <Routes>
        <Route 
          path='/posts' 
          element= { 
            <Post posts={ posts }/> 
          }  
        />
        <Route 
          path='/login' 
          element={ 
            <Login /> 
          } 
        />
        <Route 
          path='/register' 
          element={ 
            <Register /> 
            } 
        />
      </Routes> 
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
