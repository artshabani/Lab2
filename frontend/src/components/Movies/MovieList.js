import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import "../ComponentsCSS/MovieList.css";
import { Link } from "react-router-dom";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const url = selectedCategory
        ? `http://localhost:5000/api/movies?category=${selectedCategory}`
        : "http://localhost:5000/api/movies";
      const res = await axios.get(url);
      setMovies(res.data);
    };
    fetchMovies();
  }, [selectedCategory]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category === "") {
      // If all categories are selected, show all the movies
      setMovies([]);
    } else {
      // Filter current movies based on the selected category
      const filteredMovies = currentMovies.filter((movie) => movie.category === category);
      setMovies(filteredMovies);
    }
  };
  

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSelectedCategory("");
    axios
      .get(`http://localhost:5000/api/movies?title=${searchValue}`)
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="movie-list-container">
      <div className="filter-bar">
        <form onSubmit={handleSearchSubmit}>
          <label htmlFor="search-input">Search:</label>
          <input type="text" id="search-input" value={searchValue} onChange={handleSearchChange} />
          <button type="submit">Submit</button>
        </form>
        <label htmlFor="category-select">Filter by category:</label>
        <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="horror">Horror</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="comedy">Comedy</option>
          <option value="thriller">Thriller</option>
        </select>
      </div>
      <div className="movie-list">
        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
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
