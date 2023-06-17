import React from 'react';
import { Link } from "react-router-dom";
import Statistics from '../admin/Statistics';

function Dashboard() {

    return (
        <>
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                </div>

                <div className="row">
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div
                                            className="
                    text-xs
                    font-weight-bold
                    text-primary text-uppercase
                    mb-1
                  "
                                        >
                                            Movies
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                            40,000
                                        </div>
                                        <Link to="/movies" className="nav-link"><a className="btn btn-primary">Watch</a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div
                                            className="
                    text-xs
                    font-weight-bold
                    text-success text-uppercase
                    mb-1
                  "
                                        >
                                            Statistics
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                            215,000
                                        </div>
                                        <Link to="/statistics" className="nav-link"><a className="btn btn-success">View</a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-info shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div
                                            className="text-xs font-weight-bold text-info text-uppercase mb-1"
                                        >
                                            Roles
                                        </div>
                                        <Link to="/roles" className="nav-link"><a className="btn btn-secondary">View</a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-warning shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div
                                            className="
                    text-xs
                    font-weight-bold
                    text-warning text-uppercase
                    mb-1
                  "
                                        >
                                            Logs
                                        </div>
                                        <Link to="/logs" className="nav-link"><a className="btn btn-warning">View</a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Statistics />
                </div>
            </div>
        </>
    )
}
export default Dashboard;