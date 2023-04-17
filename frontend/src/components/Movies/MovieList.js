import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import "../ComponentsCSS/MovieList.css";
import { Link } from "react-router-dom";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get("http://localhost:5000/api/movies");
      setMovies(res.data);
    };
    fetchMovies();
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="movie-list">
      {currentMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(movies.length / moviesPerPage) }, (_, i) => i + 1).map((pageNumber) => (
          <li key={pageNumber} className="page-item">
            <Link to="#" className="page-link" onClick={() => paginate(pageNumber)}>
              {pageNumber}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
