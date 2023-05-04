import React, { Component } from "react";
import { Link } from 'react-router-dom';

function Downloaded() {

    return (
        <section className="h-100 h-custom">
            <div className="container h-100 py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="table-responsive">
                            <table
                                className="table"
                            >
                                <thead>
                                    <tr>
                                        <th scope="col" className="h5">Your Downloaded Movies</th>
                                        <th scope="col">Listeners</th>
                                        <th scope="col">Rating</th>
                                        <th scope="col">Price</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-column ms-4">
                                                    <p className="mb-2"></p>
                                                    <p className="mb-0"></p>
                                                </div>
                                            </div>
                                        </th>
                                        <td className="align-middle">
                                            <p className="mb-0" style={{fontWeight: 500}}>

                                            </p>
                                        </td>
                                        <td className="align-middle">
                                            <p className="mb-0" style={{fontWeight: 500}}>

                                            </p>
                                        </td>
                                        <td className="align-middle">
                                            <p className="mb-0" style={{fontWeight: 500}}>

                                            </p>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                style="height: 50px"
                                            >
                                                Remove from Saved
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Link to="/movies">
                            <button className="btn btn-primary">Go back</button>
                        </Link>
                    </div>
                </div>
            </div >
        </section >
    )
}

export default Downloaded;