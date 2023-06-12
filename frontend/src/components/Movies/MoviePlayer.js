import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../ComponentsCSS/PlayMovie.css';

function MoviePlayer() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`).then(response => {
      setMovie(response.data);
      updateViewCount(response.data); // Pass the movie ID to the function
    });
  }, [id]);

  // Function to update view count for a specific movie
  const updateViewCount = movie => {
    const updatedMovie = {
      ...movie,
      viewCount: movie.viewCount + 1,
    };
    console.log(updatedMovie);
    axios.put(`http://localhost:5000/api/movies`, updatedMovie);
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="video-container">
      <h2>Now playing: {movie.title}</h2>
      <video className="video-player" controls autoplay >
        <source src={`/movieTrailers/${movie.trailer}`} type="video/mp4" />
      </video>
    </div>
  );
}

export default MoviePlayer;