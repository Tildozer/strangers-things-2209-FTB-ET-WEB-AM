import React from "react";
import { useLocation, Link } from "react-router-dom";

const Nav = ({ posts }) => {
    
  const location = useLocation();
  const pathName = location.pathname

  return (
    <nav className='main-nav'>
      <Link to='/posts' className={pathName === '/posts' ? 'selected' : 'not-selected'}>Posts ({posts.length})</Link>
      <Link to='/login' className={pathName === '/login' ? 'selected' : 'not-selected'}>Login</Link>
      <Link to='/register' className={pathName === '/register' ? 'selected' : 'not-selected'}> Register</Link>
    </nav>
  )
}

export default Nav;