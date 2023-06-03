import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useNavigate } from 'react-router-dom';
import '../ComponentsCSS/MovieDetails.css';
import '../ComponentsCSS/PlayMovie.css'
import './room.css'
import { useSelector } from 'react-redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import {
    HubConnection,
    HubConnectionBuilder,
    LogLevel,
} from "@microsoft/signalr";

function Room() {
    const [currentRoom, setCurrentRoom] = useState(null);
    const [movie, setMovie] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const history = createBrowserHistory();
    const [showPopup, setShowPopup] = useState(false);
    const state = useSelector(state => state);
    const [showTooltip, setShowTooltip] = useState(false);
    const [message, setMessage] = useState('');

    const [comments, setComments] = useState([]);
    const [hubConnection, setHubConnection] = useState(null);

    //let hubConnection = null;

    const handleClose = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        getRoom();
    }, [id]);

    useEffect(() => {
        if (currentRoom) {
            getMovie()
            CheckPrivate()
        }
    }, [currentRoom])

    useEffect(() => {
        createHubConnection(id);
        return () => {
            clearComments();
        };
    }, [id]);

    const getMovie = async () => {
        await axios.get(`http://localhost:5000/api/movies/${currentRoom.movieId}`).then((response) => {
            setMovie(response.data);
        });
    }

    const getRoom = async () => {
        await axios.get(`http://localhost:5000/api/room/${id}`).then((res) => {
            setCurrentRoom(res.data)
        })
    }

    const endRoom = async () => {
        await axios.put(`http://localhost:5000/api/room/${id}`).then((res) => {
            setCurrentRoom(res.data)
            setShowPopup(true)
        })
    }

    const handleShareClick = () => {
        const url = window.location.href;
        navigator.clipboard
            .writeText(url)
            .then(() => {
                console.log("URL copied to clipboard:", url);
                setShowTooltip(true);
                setTimeout(() => {
                    setShowTooltip(false);
                }, 2000); // Hide tooltip after 2 seconds
            })
            .catch((error) => {
                console.error("Failed to copy URL to clipboard:", error);
            });
    };

    function CheckPrivate() {
        let found = false;

        if (currentRoom.public !== true) {
            if (state.user) {
                currentRoom.userEmails.forEach((user) => {
                    if (state.user.email === user.userEmail) {
                        found = true;
                    }
                })
            }
            if (found == false) {
                navigate('/')
            }
        }
    }

    const handleComment = () => {
        const obj = {
            body: message,
            username: state.user.username,
            roomId: id.toString(),
        };
        if (message) {
            addComment(obj).then(() => setMessage(""));
        }
    };

    const createHubConnection = (roomId) => {
        if (roomId) {
            const connection = new HubConnectionBuilder()
                .withUrl("http://localhost:5000/room/" + "?roomId=" + roomId, {
                    accessTokenFactory: () => state.user.token,
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            connection
                .start()
                .catch((error) =>
                    console.log("Error establishing the connection: ", error)
                );

            connection.on("LoadComments", (room) => {
                console.log("is working dis ?", room);
                if (room.comments) {
                    room.comments.forEach((comment) => {
                        comment.createdAt = new Date(comment.createdAt);
                    });
                    setComments(room.comments);
                }
                setCurrentRoom(room.currentRoom);
            });

            connection.on("ReceiveComment", (comment) => {
                comment.createdAt = new Date(comment.createdAt);
                setComments((prevComments) => [...prevComments, comment]);
            });            

            setHubConnection(connection);
        }
    };

    const stopHubConnection = () => {
        hubConnection
            .stop()
            .catch((error) => console.log("Error stopping connection: ", error));
    };

    const clearComments = () => {
        setComments([]);
        stopHubConnection();
    };

    const addComment = async (values) => {
        if (state.user && hubConnection && hubConnection) {
            try {
                await hubConnection.invoke("SendComment", values);
            } catch (error) {
                console.log(error);
            }
        }
    };

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
                <OverlayTrigger
                    overlay={
                        <Tooltip id="tooltip-disabled">
                            Link copied successfully!
                        </Tooltip>
                    }
                    show={showTooltip}
                    placement="top"
                >
                    <Button
                        className="me-2"
                        variant="secondary"
                        onClick={handleShareClick}
                    >
                        Share
                    </Button>
                </OverlayTrigger>
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
                                    {comments.map((comment) => (
                                        <div className="chat-message" key={comment.id}>
                                            <span className="chat-sender">{comment.username}:</span>
                                            <span className="chat-text">{comment.body}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="chat-input-container">
                                    <input onChange={(e) => setMessage(e.target.value)} type="text" className="chat-input" placeholder="Type your message..." />
                                    <button onClick={handleComment} className="chat-send-btn">Send</button>
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
