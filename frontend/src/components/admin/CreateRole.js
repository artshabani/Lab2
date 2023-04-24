import React from 'react';
import { Link } from 'react-router-dom';

function CreateRole() {
    return (
        <div>
            <div class="modal-dialog" style={{ width: '600px' }}>
                <div class="modal-content">
                    <form class="form">
                        <div class="modal-header">
                            <h4 class="modal-title">Create Role</h4>
                            <Link to="/roles" className="nav-link"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" onClick="window.location='/admin/roles';">&times;</button></Link>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>RoleName:</label>
                                <input name="RoleName" id="RoleName" type="text" class="form-control" value="" required />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <Link to="/roles" className="nav-link"><input type="button" class="btn btn-dark" value="Anulo" /></Link>
                            <input type="submit" value="Create Role" class="btn btn-primary float-right" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateRole;
