import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom';

import {
  fetchPost, 
  loggedIn,
} from './api/index.js';

import {
 Posts,
 Login,
 Logout,
 Register,
 Nav,
 Dashboard,
 SinglePost,
 Alert,
} from './components/index.js';

const App = ()=> {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [editAPost, setEditAPost] = useState(false);
  const [editPostObj, setEditPostObj] = useState({});
  const [alert, setAlert] = useState(false);
  const [isUserLoggingIn, setIsUserLoggingIn] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  
  const token = window.localStorage.getItem('token');
  const location = useLocation();
  const pathName = location.pathname;

  const getPosts = async (token) => {
    const data = await fetchPost(token);
    const posts = data.data.posts;
    setPosts(posts);
  }

  useEffect( ()=> {
    getPosts(token);
  }, [])

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
            <Posts 
              posts={ posts }
              getPosts={ getPosts }
              token={ token }
              user={ user }
              setUser={ setUser }
              setEditAPost={ setEditAPost }
              editAPost={ editAPost }
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
                setIsUserLoggingIn={ setIsUserLoggingIn }
                setAlert={ setAlert }
                setAlertMessage={ setAlertMessage }
              /> 
          } 
        />
        <Route 
          path='/register' 
          element={ 
            token ?
              <Navigate to='/dashboard'/>
            : <Register 
                setAlertMessage={ setAlertMessage }
                setAlert={ setAlert }
                setUser={ setUser }
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
                token={ token }
                loggedIn={ loggedIn }
                setEditAPost={ setEditAPost }
                editAPost={ editAPost }
                setEditPostObj={ setEditPostObj}
                editPostObj={ editPostObj }
                posts={ posts }
                setAlert={ setAlert }
                setAlertMessage={ setAlertMessage }
                getPosts={ getPosts }
              />
            : <Navigate to='/login'/>
          }
        />
        <Route 
          path='/logout'
          element={ <Logout setAlert={ setAlert } /> }
        />
        {
          posts.length ?
            posts.map(singlePost => {
             return ( 
               <Route 
                 key={ singlePost._id }
                 path={ `/single-post/${ singlePost._id }` }
                 element={ <SinglePost
                   singlePost={ singlePost }
                   token={ token }
                   user={ user }
                   setUser={ setUser }
                   editAPost={ editAPost }
                   setEditAPost={ setEditAPost }
                   editPostObj={ editPostObj }
                   setEditPostObj={ setEditPostObj }
                   setAlert={ setAlert }
                   setAlertMessage={ setAlertMessage }
                 />
                 }
              />
             )
              })
          : null
        }
      </Routes> 
     {
       alert ? 
         <Alert 
           setAlert={ setAlert }
           alertMessage={ alertMessage }
           setAlertMessage={ setAlertMessage }
           isUserLoggingIn={ isUserLoggingIn }
           setIsUserLoggingIn={ setIsUserLoggingIn }
         />
       : null
     }
    </div>
  )
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
