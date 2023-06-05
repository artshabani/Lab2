import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CreateRole() {
    const [roleName, setRoleName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/createrole', {
            method: 'POST',
            body: JSON.stringify({ roleName: roleName }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    window.location = '/admin/roles';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error(error));
    }

    return (
        <div>
            <div className="modal-dialog" style={{ width: '600px' }}>
                <div className="modal-content">
                    <form onSubmit={handleSubmit} className="form">
                        <div className="modal-header">
                            <h4 className="modal-title">Create Role</h4>
                            <Link to="/roles" className="nav-link"><button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick="window.location='/admin/roles';">&times;</button></Link>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>RoleName:</label>
                                <input onChange={(e)=>setRoleName(e.target.value)} name="RoleName" id="RoleName" type="text" className="form-control" required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Link to="/roles" className="nav-link"><input type="button" className="btn btn-dark" value="Anulo" /></Link>
                            <input type="submit" value="Create Role" className="btn btn-primary float-right" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateRole;
