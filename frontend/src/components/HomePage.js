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
      <h1>Welcome to our movie streaming platform</h1>
      <br />
      <br />
      <br />
      <br />
      <h2>Top 3 Most Viewed Movies</h2>
      <br />

      <br />
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
