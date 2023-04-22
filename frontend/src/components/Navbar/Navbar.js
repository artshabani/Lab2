import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/actions';

const Navbar = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem('token');
    dispatch(setUser());
    navigate("/");
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="nav-link"><a class="navbar-brand" href="#">Navbar</a></Link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li class="nav-item">
            <Link to="/users" className="nav-link">Users</Link>
          </li>
          <li class="nav-item">
            <Link to="/movies" className="nav-link">Movies</Link>
          </li>
          <li class="nav-item">
            <Link to="/contactus" className="nav-link">Contact us</Link>
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
      </div>
    </nav>
  )
}


export default Navbar;