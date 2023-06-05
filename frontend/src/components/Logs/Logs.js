import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination } from '@material-ui/lab';
import '../ComponentsCSS/LogsList.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {
  BarLoader,
  DoubleBubble,
  SlidingPebbles,
} from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';

function LogList() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage, setLogsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/logs').then((response) => {
      setLogs(response.data);
      setIsLoading(false);
    });
  }, []);

  const filteredLogs = logs.filter((log) => {
    const term = searchTerm.toLowerCase();
    const username = log.username.toLowerCase();
    const entity = log.action.toLowerCase();
    const action = log.entity.toLowerCase();

    return (
      username.includes(term) || entity.includes(term) || action.includes(term)
    );
  });

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePerPageChange = (event) => {
    setLogsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

  const getClassForAction = (action) => {
    switch (action) {
      case 'Created':
        return 'created';
      case 'Deleted':
        return 'deleted';
      case 'Updated':
        return 'updated';
      default:
        return '';
    }
  };

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
                  <h2 style={{ color: 'black' }}>
                    Log List
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
                <select value={logsPerPage} onChange={handlePerPageChange}>
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
                  <th>Admin</th>
                  <th>Action</th>
                  <th>Entity</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {currentLogs.map((log) => (
                  <tr key={log.id} className={getClassForAction(log.action)}>
                    <td>{log.username}</td>
                    <td>{log.action}</td>
                    <td>{log.entity}</td>
                    <td>{log.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="clearfix">
              <div className="hint-text">
                Showing <b>{currentLogs.length}</b> out of{' '}
                <b>{filteredLogs.length}</b> entries
              </div>
              <div className="pagination d-flex justify-content-center">
                <Pagination
                  count={Math.ceil(filteredLogs.length / logsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  style={{ backgroundColor: "white" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LogList;
