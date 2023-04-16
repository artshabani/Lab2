import React, { useState, useEffect } from 'react';
import { getMovies } from '../AXIOS/movies.js';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies()
      .then(data => setMovies(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
