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
} from './components/index.js'

const App = ()=> {
  const [posts, setPosts] = useState([]);
  
const getPost = async () => {
  const data = await fetchPost();
  const posts = data.data.posts;
  setPosts(posts);
}
  
  useEffect( ()=> {
    getPost();
  }, [])
  
 
  return (
    <div>
      <h1 className='title'>Strangers Things</h1>
      <nav className='main-nav'>
        <Link to='/posts'><button>Posts ({posts.length})</button></Link>
        <Link to='/login'><button>Login</button></Link>
        <Link to='/register'><button>Register</button></Link>
      </nav>
      <Routes>
        <Route path='/posts' element= { <Post posts={ posts }/> }  />
        <Route path='/login' element={ <Login />} />
        <Route path='/register' element={ <Register />} />
      </Routes> 
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
