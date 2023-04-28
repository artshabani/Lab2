import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Roles() {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
          const res = await axios.get('http://localhost:5000/api/admin/roles');
          setRoles(res.data);
        };
        fetchRoles();
      }, []);

    // useEffect(() => {
    //     fetch('/api/admin/roles')
    //         .then(response => response.json())
    //         .then(data => setRoles(data.roles))
    //         .catch(error => console.error(error));
    // }, []);

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <div className="float-right">
                    <Link to="/createrole" className="nav-link"><a className="btn btn-primary">Create new</a></Link>
                </div>
                <h6 className="m-0 font-weight-bold text-primary"></h6>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <div className="float-right">
                        <form method="get">
                            <div className="form-actions no-color">

                            </div>
                        </form>
                    </div>
                    <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map(role => (
                                <tr key={role.id}>
                                    <td>{role.id}</td>
                                    <td>{role.name}</td>
                                    <td>
                                        <Link to={`/edituserinrole/${role.id}`} className="nav-link">
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        {/* <Link to={`/deleterole/${role.id}`} className="nav-link">
                                            <i className="fas fa-trash"></i>
                                        </Link> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>#</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Roles;
