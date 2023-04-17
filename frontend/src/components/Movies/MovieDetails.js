import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`).then((response) => {
      setMovie(response.data);
    });
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <Link to={`/PlayMovie/${movie.id}`}><button>Play Movie</button></Link>
    </div>
  );
}

export default MovieDetails;
