import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './Movies/MovieCard';
import Footer from './Footer';
import Subscription from './Subscription/Subscription';
import Button from 'react-bootstrap/Button';

function HomePage() {
  const [topMovies, setTopMovies] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalCount, setModalCount] = useState(0);

  useEffect(() => {
    const fetchTopMovies = async () => {
      const res = await axios.get('http://localhost:5000/api/movies');
      console.log(res.data)
      const sortedMovies = res.data.sort((a, b) => b.viewCount - a.viewCount);
      const top3Movies = sortedMovies.slice(0, 3);
      setTopMovies(top3Movies);
    };
    fetchTopMovies();
  }, []);

  const handleOpenModal = () => {
    setModalCount(3); // Set the modalCount to 3 to display 3 modals
  };

  const handleCloseModal = () => {
    setModalCount(0); // Reset the modalCount to 0 to hide the modals
  };

  const renderModals = () => {
    const modals = [];
    for (let i = 0; i < modalCount; i++) {
      modals.push(
        <Subscription
          key={i}
          show={true}
          onHide={handleCloseModal}
        />
      );
    }
    return modals;
  };

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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button variant="danger" onClick={handleOpenModal}>
        Subscribe
      </Button>

      {modalCount > 0 && renderModals()}
      </div>

      {/* <Button variant="danger" onClick={() => setModalShow(true)}>
        Subscribe
      </Button>

      <Subscription
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> */}
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
