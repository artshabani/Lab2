import React from 'react';
import { Link } from 'react-router-dom';
import '../ComponentsCSS/MovieCard.css';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <Link to={`/movies/${movie.id}`}>
        {/* <img src={movie.imageUrl} alt={movie.title} />
        <h3>{movie.title}</h3> */}
        <div class="frem">
          <div class="center-cant">
            <img src={movie.imageUrl} alt={movie.title} />
            <div class="row">
              <p>{movie.title}</p>
              <h2>{movie.viewCount} views</h2>
            </div>
          </div>
        </div>
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
