import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import MovieCard from "./MovieCard";
import "../ComponentsCSS/MovieDetails.css";

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`).then((response) => {
      setMovie(response.data);
    });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      axios
        .delete(`http://localhost:5000/api/movies/${id}`)
        .then(() => {
           navigate.push(`/movies`); // navigate to movies page after successful deletion
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="movie-card-wrapper">
            <div className="movie-card">
              <MovieCard movie={movie} />
              <Link to={`/PlayMovie/${movie.id}`}>
                <button className="btn btn-primary">Play Movie</button>
              </Link>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Movie
              </button>
              <Link to={`/EditMovie/${movie.id}`}>
                <button className="btn btn-warning">Edit Movie</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
