import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditUser(props) {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/account/${id}`)
      .then(response => {
        const user = response.data;
        setUser(user);
      })
      .catch(error => {
        console.log('Error fetching user data: ', error);
      });
  }, [id]);

  const handleUpdateUser = event => {
    event.preventDefault();

    const updatedUser = {
      id: id,
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
    };
    console.log(updatedUser);

    // console.log("This is " + id, "This is updated user: " + updatedUser.name);
    axios
      .put(`http://localhost:5000/api/account/${id}`, updatedUser)
      .then(response => {
        window.location.reload();
        console.log('PUT request sent successfully: ', response.data);
      })
      .catch(error => {
        console.log('Error sending PUT request: ', error);
      });
    navigate('/users');
  };

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleUpdateUser}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            readOnly
          />
        </div>
        {/* <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            disabled
          />
        </div> */}
        <button type="submit" value="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditUser;
