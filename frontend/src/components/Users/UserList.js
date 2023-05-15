import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination } from '@material-ui/lab';
import '../ComponentsCSS/UserList.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/account/users').then(response => {
      setUsers(response.data);
      setIsLoading(false);
    });
  }, []);

  const filteredUsers = users.filter(user => {
    const term = searchTerm.toLowerCase();
    const name = user.name.toLowerCase();
    const username = user.username.toLowerCase();
    const email = user.email.toLowerCase();
    return (
      name.includes(term) || username.includes(term) || email.includes(term)
    );
  });

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePerPageChange = event => {
    setUsersPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  function handleDeleteClick(id, name) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the user: ${name}?`
    );
    if (confirmDelete) {
      axios.delete(`http://localhost:5000/api/account/${id}`).then(response => {
        setUsers(users.filter(user => user.id !== id));
        navigate('/users');
      });
    }
  }

  return (
    <div className="container">
      {isLoading ? (
        <div className="center">
          <BarLoader
            text={'Loading...'}
            center={false}
            width={'150px'}
            height={'150px'}
          />
        </div>
      ) : (
        <div className="table-responsive">
          <div
            style={{ border: '1.5px solid white' }}
            className="table-wrapper"
          >
            <div className="table-title">
              <div className="row">
                <div className="col-xs-6">
                  <h2>
                    User <b>list</b>
                  </h2>
                </div>
                <div className="col-xs-6">
                  <div className="search-box">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                      <span className="input-group-addon">
                        <i className="material-icons">&#xE8B6;</i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label>
                Show{' '}
                <select value={usersPerPage} onChange={handlePerPageChange}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>{' '}
                entries
              </label>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <Link to={`/users/${user.id}`}>
                        <a className="details">
                          <i className="material-icons">&#xE253;</i>
                        </a>
                      </Link>

                      <Link to={`/EditUser/${user.id}`}>
                        <a className="edit">
                          <i className="material-icons">&#xE872;</i>
                        </a>
                      </Link>

                      <Link to={`/users/${user.id}`}>
                        <a
                          className="delete"
                          onClick={() => handleDeleteClick(user.id, user.name)}
                        >
                          <i className="material-icons">&#xE872;</i>
                        </a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="clearfix">
              <div className="hint-text">
                Showing <b>{currentUsers.length}</b> out of{' '}
                <b>{filteredUsers.length}</b> entries
              </div>
              <div className="pagination">
                <Pagination
                  count={Math.ceil(filteredUsers.length / usersPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;
