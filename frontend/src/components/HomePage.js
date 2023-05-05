import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const fetchTopMovies = async () => {
      const res = await axios.get('http://localhost:5000/api/movies');
      const sortedMovies = res.data.sort((a, b) => b.viewCount - a.viewCount);
      const top3Movies = sortedMovies.slice(0, 3);
      setTopMovies(top3Movies);
    };
    fetchTopMovies();
  }, []);

  return (
    <div>
      <br />
      <h1>Unlimited movies, <br/>endless entertainment.</h1>
      <br />
      <br />
      <h6>Experience the magic of cinema from the comfort of your home</h6>
      <br />
      <br />
      <br />
      <Link to="/signup" className="nav-link"><button className="btn btn-success">Get Started</button></Link>
      <Link to="/movies" className="nav-link"><button className="btn btn-primary">Try For Free</button></Link>
      <br />
      <h2>Top 3 Most Viewed Movies</h2>
      <ul>
        {topMovies.map(movie => (
          <li key={movie.id}>
            <br />
            <br />
            <p>
              {movie.title} with <b>{movie.viewCount} views</b>{' '}
            </p>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
