import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import './RoomForm.css';

const CreateRoom = () => {
  const state = useSelector(state => state);
  const { movieid } = useParams();
  const [room, setRoom] = useState({
    movieId: movieid,
    name: '',
    public: true,
    roomAdmin: state.user.email,
    adminUsername: state.user.username,
    // userEmails: []
  });

  const handleCreateRoom = (e) => {
    e.preventDefault();
    console.log(room)
    axios.post(`http://localhost:5000/api/room`, room)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  return (
    <div className="create-room-container">
      <div className="create-room-box">
        <h2>Create Room</h2>
        <form onSubmit={handleCreateRoom}>
          <div className="form-group">
            <label>Room Type:</label>
            <input
              type="checkbox"
              checked={room.public}
              onChange={(e) => setRoom({ ...room, public: !room.public })}
            />
            <label >Public</label>
          </div>
          <div className="form-group">
            <label>Room Name:</label>
            <input
              type="text"
              value={room.name}
              required
              onChange={handleInputChange}
              name="name"
            />
          </div>
          <button type="submit">Create Room</button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
