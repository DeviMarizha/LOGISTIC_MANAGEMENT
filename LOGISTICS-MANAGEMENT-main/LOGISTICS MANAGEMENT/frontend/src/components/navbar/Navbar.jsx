// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authActions'; // Import your logout action
import './Navbar.css';
import { CSSTransition } from 'react-transition-group';
import logo from './courier.png';

function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, isAdminAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/">
          <img className='logo' src={logo} alt="Deliveroo Logo" height="40" />
          TPort
        </Link>
      </div>
      <ul>
        <CSSTransition classNames="fade" timeout={300}>
          <li>
            <Link to="/">HOME</Link>
          </li>
        </CSSTransition>
        <CSSTransition classNames="fade" timeout={300}>
          <li>
            <Link to="/about">ABOUT</Link>
          </li>
        </CSSTransition>
        {isAuthenticated && !isAdminAuthenticated ? (
          <>
            <CSSTransition classNames="fade" timeout={300}>
              <li>
                <Link id="profile" to="/profile">
                  {user.username || user.email}
                </Link>
              </li>
            </CSSTransition>
            <CSSTransition classNames="fade" timeout={300}>
              <li>
                <Link to="/" onClick={handleLogout} id="logout">
                  LOGOUT
                </Link>
              </li>
            </CSSTransition>
          </>
        ) : null}

        {isAdminAuthenticated ? (
          <>
            <CSSTransition classNames="fade" timeout={300}>
              <li>
                <Link id="adminProfile" to="/">
                  {user.username || user.email}
                </Link>
              </li>
            </CSSTransition>
            <CSSTransition classNames="fade" timeout={300}>
              <li>
                <Link to="/" onClick={handleLogout} id="adminLogout">
                  ADMIN LOGOUT
                </Link>
              </li>
            </CSSTransition>
          </>
        ) : null}

        {!isAuthenticated && !isAdminAuthenticated ? (
          <>
            <CSSTransition classNames="fade" timeout={300}>
              <li>
                <Link id="login" to="/login">
                  LOGIN
                </Link>
              </li>
            </CSSTransition>
            <CSSTransition classNames="fade" timeout={300}>
              <li>
                <Link id="admin" to="/adminlogin">
                  ADMIN
                </Link>
              </li>
            </CSSTransition>
          </>
        ) : null}
      </ul>
    </nav>
  );
}

export default Navbar;
