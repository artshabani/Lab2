import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import '../ComponentsCSS/MovieList.css';
import { Link } from 'react-router-dom';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get('http://localhost:5000/api/movies');
      setMovies(res.data);
    };
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter(movie => {
    const regex = new RegExp(searchTerm, 'gi');
    const matchesSearchTerm =
      regex.test(movie.title) ||
      regex.test(movie.genre.name) ||
      regex.test(movie.description);
    const matchesSelectedCategory =
      selectedCategory === '' || movie.genre.name === selectedCategory;
    return matchesSearchTerm && matchesSelectedCategory;
  });

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleCategoryChange = category => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="movie-list-container">
      <div className="category-selector">
        <button
          className="category-btn"
          onClick={() => handleCategoryChange('')}
        >
          All
        </button>
        <button
          className="category-btn"
          onClick={() => handleCategoryChange('Action')}
        >
          Action
        </button>
        <button
          className="category-btn"
          onClick={() => handleCategoryChange('Comedy')}
        >
          Comedy
        </button>
        <button
          className="category-btn"
          onClick={() => handleCategoryChange('Drama')}
        >
          Drama
        </button>
      </div>
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="search-btn">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <div className="movie-list">
        {currentMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <ul className="pagination">
        {Array.from(
          { length: Math.ceil(filteredMovies.length / moviesPerPage) },
          (_, i) => i + 1
        ).map(pageNumber => (
          <li key={pageNumber} className="page-item">
            <Link
              to="#"
              className="page-link"
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
