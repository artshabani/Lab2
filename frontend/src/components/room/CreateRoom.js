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
    userEmails: [],
  });
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [error2, setError2] = useState('');

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (room.userEmails.length === 0 && !room.public) {
      setError2('Please add an email');
    } else {
      console.log(room)
      setError2('');
      axios.post(`http://localhost:5000/api/room`, room)
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  function addEmail() {
    const isValid = validateEmail(email);
    const updatedRoom = { ...room };

    if (isValid) {
      updatedRoom.userEmails.push(email);
      setRoom(updatedRoom);
      setError('');
      setEmail('');
    } else {
      setError('Invalid email');
    }
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

    return emailRegex.test(email);
  }

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

          {!room.public && <>
            <div className="form-group">
              <label>User Emails:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type='button' className='btn btn-primary' onClick={addEmail}>Add Email</button>
            </div>
            <p>{error}</p>
          </>}

          <p>{error2}</p>
          <button type="submit">Create Room</button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
