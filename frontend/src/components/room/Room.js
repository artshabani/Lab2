import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../Movies/MovieCard';
import '../ComponentsCSS/MovieDetails.css';
import '../ComponentsCSS/PlayMovie.css'
import './room.css'

function Room() {
    const [room, setRoom] = useState(null)
    const [movie, setMovie] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const history = createBrowserHistory();

    useEffect(() => {
        getRoom();
    }, [id]);

    useEffect(() => {
        if (room) {
            getMovie()
        }
    }, [room])

    const getMovie = async () => {
        await axios.get(`http://localhost:5000/api/movies/${room.movieId}`).then((response) => {
            setMovie(response.data);
        });
    }

    const getRoom = async () => {
        await axios.get(`http://localhost:5000/api/room/${id}`).then((res) => {
            setRoom(res.data)
        })
    }

    const endRoom = () => {

    }

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div class="video-container">
                <h2>Now playing: {movie.title}</h2>
                <video class="video-player" controls autoplay>
                    <source src="/Wednesday.mp4" type="video/mp4" />
                </video>
                <button className='btn btn-danger'>End Room</button>
                <div className="col-md-5">
                    <div className="row">
                        <div className="col-md-11" style={{
                            position: 'relative',
                            left: '225%',
                            transform: 'translateX(50 %)',
                            top: '-610px'
                        }}>
                            <div className="chat-container dark-mode">
                                <div className="chat-messages">
                                    <div className="chat-message">
                                        <span className="chat-sender">John Doe:</span>
                                        <span className="chat-text">Hey, how's it going?</span>
                                    </div>
                                    <div className="chat-message">
                                        <span className="chat-sender">Jane Smith:</span>
                                        <span className="chat-text">Doing great, thanks!</span>
                                    </div>
                                </div>
                                <div className="chat-input-container">
                                    <input type="text" className="chat-input" placeholder="Type your message..." />
                                    <button className="chat-send-btn">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Room;
