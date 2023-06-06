import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    HubConnection,
    HubConnectionBuilder,
    LogLevel,
} from "@microsoft/signalr";
import { useParams } from "react-router";

function Topic() {
    const [currentTopic, setCurrentTopic] = useState(null);
    const [message, setMessage] = useState('');
    const state = useSelector(state => state);
    const [comments, setComments] = useState([]);
    const [hubConnection, setHubConnection] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        createHubConnection(id);
        return () => {
            clearComments();
        };
    }, [id]);

    const handleComment = () => {
        const obj = {
            body: message,
            username: state.user.username,
            topicId: id.toString(),
        };
        if (message) {
            addComment(obj).then(() => setMessage(""));
        }
    };

    const createHubConnection = (topicId) => {
        if (topicId) {
            const connection = new HubConnectionBuilder()
                .withUrl("http://localhost:5000/topic/" + "?topicId=" + topicId, {
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
                setCurrentTopic(room);
            });

            connection.on("ReceiveComment", (comment) => {
                comment.createdAt = new Date(comment.createdAt);
                setComments((prevComments) => [...prevComments, comment]);
            });

            setHubConnection(connection);
        }
    };

    const stopHubConnection = () => {
        if (hubConnection) {
            hubConnection
                .stop()
                .catch((error) => console.log("Error stopping connection: ", error));
        }
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

    if (!currentTopic) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>Current Topic : {currentTopic.topic}</h1>

            <div className="topics-container">
                {comments.length === 0 ? (
                    <p>No comments here yet</p>
                ) : (
                    <ul className="topics-list">
                        {comments.map((comment, index) => (
                            <li key={index} className="topic-item">
                                <h3>{comment.username}:</h3>
                                <p>{comment.body}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <form onSubmit={(event) => {
                event.preventDefault()
                handleComment()
            }}
            >
                <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" name="comment" placeholder="Enter your comment" />
                <button type="submit">Add Comment</button>
            </form>
        </>
    )
}

export default Topic;