import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../ComponentsCSS/Navbar.css';
import profileIcon from '../ComponentsCSS/icons/profile.png';
import settingIcon from '../ComponentsCSS/icons/setting.png';
import helpIcon from '../ComponentsCSS/icons/help.png';
import logoIcon from '../ComponentsCSS/icons/logo.png';
import logoutIcon from '../ComponentsCSS/icons/logout.png';
import filmaUbt from '../ComponentsCSS/icons/filmaUbt.png';

const Navbar = () => {
  const toggleMenu = () => {
    const subMenu = document.getElementById('subMenu');
    subMenu.classList.toggle('open-menu');
  };

  return (
    <nav>
      <img src={filmaUbt} alt="art" className="logo" />
      <ul>
        <li>
          <Link to="/">
            <a href="#">Home</a>
          </Link>
        </li>
        <li>
          <Link to="/movies">
            <a href="#">Movies</a>
          </Link>
        </li>
        <li>
          <Link to="/users">
            <a href="#">Users</a>
          </Link>
        </li>
        <li>
          <a href="#">Logs</a>
        </li>
      </ul>
      <img
        src={profileIcon}
        alt="art"
        className="user-pic"
        onClick={toggleMenu}
      />

      <div className="sub-menu-wrap" id="subMenu">
        <div className="sub-menu">
          <div className="user-info">
            <img src={profileIcon} alt="art" />
            <h3>Art Shabani</h3>
          </div>
          <hr />
          <a href="#" className="sub-menu-link">
            <img src={profileIcon} alt="art" />
            <p>Edit Profile</p>
          </a>
          <a href="#" className="sub-menu-link">
            <img src={settingIcon} alt="art" />
            <p>Settings & Privacy</p>
          </a>
          <a href="#" className="sub-menu-link">
            <img src={helpIcon} alt="art" />
            <p>Help & Support</p>
          </a>
          <a href="#" className="sub-menu-link">
            <img src={logoutIcon} alt="art" />
            <p>Logout</p>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
