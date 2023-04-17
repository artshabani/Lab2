import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@material-ui/lab";

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users").then((response) => {
      setUsers(response.data);
      setIsLoading(false);
    });
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <h1>User List</h1>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <ul>
            {currentUsers.map((user) => (
              <p key={user.id}>Name: {user.name}</p>
            ))}
          </ul>
          <Pagination
            count={Math.ceil(users.length / usersPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default UserList;
