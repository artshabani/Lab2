import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useNavigate } from 'react-router-dom';
import '../ComponentsCSS/MovieDetails.css';
import '../ComponentsCSS/PlayMovie.css'
import './room.css'
import { useSelector } from 'react-redux';

function Room() {
    const [room, setRoom] = useState(null);
    const [movie, setMovie] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const history = createBrowserHistory();
    const [showPopup, setShowPopup] = useState(false);
    const state = useSelector(state => state);

    const handleClose = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        getRoom();
    }, [id]);

    useEffect(() => {
        if (room) {
            getMovie()
            CheckPrivate()
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
            console.log(res.data)
        })
    }

    const endRoom = async () => {
        await axios.put(`http://localhost:5000/api/room/${id}`).then((res) => {
            setRoom(res.data)
            setShowPopup(true)
        })
    }

    function CheckPrivate() {
        let found = false;

        if (state.user) {
            room.userEmails.forEach((user) => {
                if (state.user.email === user.userEmail) {
                    found = true;
                }
            })
        }
        if (found == false) {
            navigate('/')
        }
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
                <button className='btn btn-danger' onClick={endRoom}>End Room</button>
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
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <p className="popup-message">This room has ended</p>
                        <button className="close-btn" onClick={handleClose}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Room;
