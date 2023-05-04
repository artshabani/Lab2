import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Roles() {
    const [roles, setRoles] = useState([]);
    const [roleId, setRoleId] = useState('');

    useEffect(() => {
        const fetchRoles = async () => {
            const res = await axios.get('http://localhost:5000/api/admin/roles');
            setRoles(res.data);
        };
        fetchRoles();
    }, []);

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
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
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
                                        <button className='btn btn-primary'>
                                        <Link to={`/edituserinrole/${roleId}`} className="nav-link">
                                            Add or Remove Users
                                        </Link></button>
                                        <button className='btn btn-danger'>
                                        <Link to={`/deleterole/${role.id}`} className="nav-link">
                                            Delete
                                        </Link>
                                        </button>
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
