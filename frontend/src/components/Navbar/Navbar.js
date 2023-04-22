import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/actions';
// import userData from '../auth/user';
import '../ComponentsCSS/Navbar.css';
import profileIcon from '../ComponentsCSS/icons/profile.png';
import settingIcon from '../ComponentsCSS/icons/setting.png';
import helpIcon from '../ComponentsCSS/icons/help.png';
import logoIcon from '../ComponentsCSS/icons/logo.png';
import logoutIcon from '../ComponentsCSS/icons/logout.png';
import filmaUbt from '../ComponentsCSS/icons/filmaUbt.png';

const Navbar = () => {

  // const { user } = userData();
  // console.log(user);
  const toggleMenu = () => {
    const subMenu = document.getElementById('subMenu');
    subMenu.classList.toggle('open-menu');
  };

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem('token');
    dispatch(setUser());
    navigate("/");
  }

  return (
    
    // <nav class="navbar navbar-expand-lg navbar-light bg-light">
    //   <Link to="/" className="nav-link"><a class="navbar-brand" href="#">Navbar</a></Link>
    //   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //     <span class="navbar-toggler-icon"></span>
    //   </button>
    //   <div class="collapse navbar-collapse" id="navbarSupportedContent">
    //     <ul class="navbar-nav mr-auto">
    //       <li class="nav-item">
    //         <Link to="/" className="nav-link">Home</Link>
    //       </li>
    //       <li class="nav-item">
    //         <Link to="/users" className="nav-link">Users</Link>
    //       </li>
    //       <li class="nav-item">
    //         <Link to="/movies" className="nav-link">Movies</Link>
    //       </li>
    //       <li class="nav-item">
    //         <Link to="/contactus" className="nav-link">Contact us</Link>
    //       </li>
    //       {!state.user && (<>
    //         <li class="nav-item">
    //           <Link to="/login" className="nav-link">Login</Link>
    //         </li>
    //         <li class="nav-item">
    //           <Link to="/signup" className="nav-link">Signup</Link>
    //         </li>
    //       </>)}
    //       {state.user && (<>
    //         <li class="nav-item">
    //           <p>Hi: {state.user.name}</p>
    //         </li>

    //         <li class="nav-item">
    //           <button onClick={handleLogOut}>Log Out</button>
    //         </li>
    //       </>)
    //       }
    //     </ul>
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
        {!state.user && (<>
            <li class="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li class="nav-item">
              <Link to="/signup" className="nav-link">Signup</Link>
            </li>
          </>)}
          {state.user && (<>
            <li class="nav-item">
              <p>Hi: {state.user.name}</p>
            </li>

            <li class="nav-item">
              <button onClick={handleLogOut}>Log Out</button>
            </li>
          </>)
          }

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
