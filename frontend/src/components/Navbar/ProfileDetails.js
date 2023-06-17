import React from "react"
import { useSelector } from 'react-redux';

function ProfileDetails() {
    const state = useSelector(state => state);

    return (
        <>
            <section>
                <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <div className="card border-left-primary shadow py-2 mb-4" style={{ width: '400px' }}>
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Welcome Back !
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        Here's all your account info :
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-4" style={{ width: '500px' }}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Name:</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{state.user.name}</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Username:</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{state.user.username}</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Email:</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{state.user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProfileDetails;