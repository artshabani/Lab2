import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MoviePlayer() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`).then((response) => {
      setMovie(response.data);
    });
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-player">
      <h1>Now Playing: {movie.title}</h1>
      {/* Add video player component here */}
    </div>
  );
}

export default MoviePlayer;
