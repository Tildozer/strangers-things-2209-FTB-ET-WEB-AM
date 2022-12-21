import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom';

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
 SinglePost,
} from './components/index.js';

const App = ()=> {
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState({});
  const [user, setUser] = useState({});
  const [editAPost, setEditAPost] = useState(false);
  const [editPostObj, setEditPostObj] = useState({});
  
  const token = window.localStorage.getItem('token');
  const location = useLocation();
  const pathName = location.pathname;


  const getPosts = async () => {
    const data = await fetchPost();
    const posts = data.data.posts;
    setPosts(posts);
  }

  useEffect( ()=> {
    getPosts();
    setSinglePost({});
  }, [])
  console.log(singlePost._id)
  return (
    <div>
      <h1 className='title'>Strangers Things</h1>
      <Nav 
        token={ token }
        pathName={ pathName }
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
              pathName={ pathName }
              setSinglePost={ setSinglePost }
              singlePost={ singlePost }
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
                pathname={ pathName }
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
            <Route 
              path={ `/post/${ singlePost._id }` }
              element={ <SinglePost />}
            />
      </Routes> 
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
