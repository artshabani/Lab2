import React, { useState } from 'react';
import './RoomForm.css';

const CreateRoom = ({ createRoom }) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [movieName, setMovieName] = useState('');
  const [duration, setDuration] = useState('');

  const handleCreateRoom = (e) => {
    e.preventDefault();
    // Pass the form values to the createRoom function
    createRoom({ isPrivate, movieName, duration });
  };

  return (
    <div className="create-room-container">
      <div className="create-room-box">
        <h2>Create Room</h2>
        <form onSubmit={handleCreateRoom}>
          <div className="form-group">
            <label htmlFor="isPrivate">Room Type:</label>
            <input
              type="checkbox"
              id="isPrivate"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
            <label htmlFor="isPrivate">Private</label>
          </div>
          <div className="form-group">
            <label htmlFor="movieName">Movie Name:</label>
            <input
              type="text"
              id="movieName"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration:</label>
            <input
              type="text"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <button type="submit">Create Room</button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
