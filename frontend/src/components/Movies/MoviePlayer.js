import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MoviePlayer() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`).then((response) => {
      setMovie(response.data);
      updateViewCount(response.data); // Call the function to update view count
    });
  }, [id]);

  // Function to update view count for a specific movie
  const updateViewCount = (movie) => {
    const updatedMovie = {
      ...movie,
      viewCount: movie.viewCount + 1,
    };
    axios.put(`http://localhost:5000/api/movies/${id}`, updatedMovie);
  };

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
