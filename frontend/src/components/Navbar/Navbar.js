import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
          <li class="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li class="nav-item">
            <Link to="/signup" className="nav-link">Signup</Link>
          </li>
          <li class="nav-item">
            <Link to="/logout" className="nav-link">Log Out</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;