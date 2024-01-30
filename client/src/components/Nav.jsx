import React, { useContext, useEffect } from 'react';
import logo from "./logo.jpg";
import { Link } from 'react-router-dom';
import Search from "./Search";
import { UserContext } from '../App';
import User from "./User";
import './nav.scss';

const Nav = () => {
  const { state, dispatch } = useContext(UserContext);

  const handleLogout = () => {
    dispatch({ type: 'USER_LOGOUT' });
  };

  useEffect(() => {
    // Check for login status in local storage
    const user = localStorage.getItem('user');
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');

    if (user === 'true') {
      dispatch({ type: 'USER', payload: true });
    }

    if (adminLoggedIn === 'true') {
      dispatch({ type: 'ADMIN_LOGIN', payload: true });
    }
  }, [dispatch]);

  useEffect(() => {
    // Update local storage with login status
    localStorage.setItem('user', state.user ? 'true' : 'false');
    localStorage.setItem('adminLoggedIn', state.adminLoggedIn ? 'true' : 'false');
  }, [state.user, state.adminLoggedIn]);

  if (state.user) {
    return (
      <>
        <div id="menu-jk" className="header-bottom">
          <div className="header">
            <section>
            <a href={'/#slider'}><img src={logo} alt="" className="logo"/></a>
            </section>
            <nav>
              <Search />
            </nav>
            <section>
              <a href={'/#slider'}>Home</a>
              <a href={'/#about'}>About Us</a>
              <a href="/#gallery">Gallery</a>
              <a href="/#process">Process</a>
              {/* <a href="/#blog">Blog</a> */}
              <Link to="/contact">Contact Us</Link>
              <User />
              <Link to="/logout">
                <button onClick={handleLogout}>Logout</button>
              </Link>
            </section>
          </div>
        </div>
      </>
    );
  } else if (state.adminLoggedIn) {
    return (
      <>
        <div id="menu-jk" className="header-bottom">
          <div className="header">
            <section>
            <a href={'/#slider'}><img src={logo} alt="" className="logo"/></a>
            </section>
            <nav>
              <Search />
            </nav>
            <section>
            <Link to="/admin">Details</Link>
            <Link to="/ViewMessages">Messages</Link>
            {/* <Link to="/request-dashboard">Requests</Link> */}
            {/* <Link to="/admin">
                <button>Return to Panel</button>
              </Link> */}
              <Link to="/logout">
                <button onClick={handleLogout}>Logout</button>
              </Link>
            </section>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id="menu-jk" className="header-bottom">
          <div className="header">
            <section>
            <a href={'/#slider'}><img src={logo} alt="" className="logo"/></a>
            </section>
            <nav>
              <Search />
            </nav>
            <section>
              <a href={'/#slider'}>Home</a>
              <a href={'/#about'}>About Us</a>
              <a href="/#gallery">Gallery</a>
              <a href="/#process">Process</a>
              {/* <a href="/#blog">Blog</a> */}
              <Link to="contact">Contact Us</Link>
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/signup">
                <button>SignUp</button>
              </Link>
            </section>
          </div>
        </div>
      </>
    );
  }
};

export default Nav;
