import React from 'react';
import { Link } from 'react-router-dom';

function Roles() {
    return (
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="float-right">
                    <Link to="/createrole" className="nav-link"><a class="btn btn-primary" >Create new</a></Link>
                </div>
                <h6 class="m-0 font-weight-bold text-primary"></h6>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <div class="float-right">
                        <form method="get">
                            <div class="form-actions no-color">

                            </div>
                        </form>
                    </div>
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>#</th>

                            </tr>
                        </thead>
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
