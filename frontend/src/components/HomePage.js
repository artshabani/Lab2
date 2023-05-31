import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './Movies/MovieCard';
import Footer from './Footer';

function HomePage() {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const fetchTopMovies = async () => {
      const res = await axios.get('http://localhost:5000/api/movies');
      const sortedMovies = res.data.sort((a, b) => b.viewCount - a.viewCount);
      const top3Movies = sortedMovies.slice(0, 3);
      setTopMovies(top3Movies);
    };
    fetchTopMovies();
  }, []);

  return (
    <div style={{ background: 'rgba(26, 26, 26, 0.99)', color: 'white', textAlign: 'center' }}>
      <br />
      <h1>Unlimited movies, <br/>endless entertainment.</h1>
      <br />
      <br />
      <h6>Experience the magic of cinema from the comfort of your home</h6>
      <br />
      <br />
      <Link to="/signup" className="nav-link"><button className="btn btn-success">Get Started</button></Link>
      <br />
      <br />
      <br />
      <h2 style={{ display: 'flex', justifyContent: 'center', color: 'white'}}>Current Top 3 Movies</h2>
      <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 0 }}>
        {topMovies.map(movie => (
          <li key={movie.id} style={{ flexBasis: '33.33%', padding: '5px' }}>
            <MovieCard key={movie.id} movie={movie} />
          </li>
        ))}
      </ul>
      <Footer>
        
      </Footer>
    </div>
  );
}

export default HomePage;
