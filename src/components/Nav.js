import React from "react";
import { useLocation, Link } from "react-router-dom";

const Nav = (props) => {
  const { token, } = props
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <nav className='main-nav'>
      <Link to='/posts' className={ pathName === '/posts' ? 'selected' : 'not-selected' }>Posts</Link>
      {
        token ? 
          <Link to='/dashboard' className={pathName === '/dashboard' ? 'selected' : 'not-selected' }>Dashboard</Link>
        : null
      }

      {
        token ?
          <Link to='/logout' className="not-selected">LogOut</Link> 
        : <Link to='/login' className={ pathName === '/login' ? 'selected' : 'not-selected' }>Login</Link>
      }
    </nav>
  )
}

export default Nav;