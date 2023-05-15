import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/actions';
import '../ComponentsCSS/Navbar.css';
import profileIcon from '../ComponentsCSS/icons/profile.png';
import helpIcon from '../ComponentsCSS/icons/help.png';
import logoutIcon from '../ComponentsCSS/icons/logout.png';
import filmaUbt from '../ComponentsCSS/icons/filmaUbt.png';

const Navbar = () => {
  const toggleMenu = () => {
    const subMenu = document.getElementById('subMenu');
    subMenu.classList.toggle('open-menu');
  };

  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    dispatch(setUser());
    toggleMenu();
    navigate('/');
  };

  return (
    <nav>
      <img src={filmaUbt} alt="art" className="logo" />
      <ul>
        <li>
          <Link to="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link to="/movies">
            <a>Movies</a>
          </Link>
        </li>
        <li>
          <Link to="/users">
            <a>Users</a>
          </Link>
        </li>
        <li>
          <Link to="/logs">
            <a>Logs</a>
          </Link>
        </li>
        {!state.user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {state.user && (
          <>
            <li class="nav-item">
              <a style={{ color: 'red' }}>Hi {state.user.name}</a>
            </li>
          </>
        )}
      </ul>
      <img
        src={profileIcon}
        alt="art"
        className="user-pic"
        onClick={toggleMenu}
      />

      <div className="sub-menu-wrap" id="subMenu">
        <div className="sub-menu">
          {state.user && (
            <>
              <div className="user-info">
                <img src={profileIcon} alt="art" />
                <h3 style={{ color: 'red' }}>{state.user.name}</h3>
              </div>
              <hr />
              <a className="sub-menu-link">
                <img src={profileIcon} alt="art" />
                <p>Edit Profile</p>
              </a>
            </>
          )}

          {state.user && (
            <>
              <Link to="/viewhistory">
                <a className="sub-menu-link">
                  <img src={helpIcon} alt="art" />
                  <p>View History</p>
                </a>
              </Link>
              <a onClick={handleLogOut} className="sub-menu-link">
                <img src={logoutIcon} alt="art" />
                <p>Logout</p>
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
