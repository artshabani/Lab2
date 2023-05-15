import React from 'react';
import { Link } from 'react-router-dom';
import '../ComponentsCSS/MovieCard.css';

function MovieCard({ movie }) {
  return (
    <div>
      <Link to={`/movies/${movie.id}`}>
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
    </div>
  );
}

export default MovieCard;
