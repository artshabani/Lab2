import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";


function UserDetails() {
  const { id } = useParams(); // get the id parameter from the URL
  const [user, setUser] = useState(null); // initialize the user state to null

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`).then((response) => {
      setUser(response.data);
    });
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.id}</h1>
      <p>{user.name}</p>
      <p>{user.username}</p>
      
      
    </div>
  );
}

export default UserDetails;
