import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <Link to={`/movies/${movie.id}`}>
        <img src={movie.imageUrl} alt={movie.title} />
        <h3>{movie.title}</h3>
      </Link>
      <p>{movie.description}</p>
      <b>
        <p>{movie.genre.name}</p>
      </b>
      <p>{movie.viewCount} views</p>
    </div>
  );
}

export default MovieCard;
