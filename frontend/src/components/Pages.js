import React from 'react';
import Signup from './auth/Signup/Signup';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'
import Navbar from './Navbar/Navbar';
import Login from './auth/Login/Login'
//import UserList from './UserList';

const Pages = () => {
    return (
        <>
        <Navbar/>
            <Routes>
                <Route path='/signup' element={<Signup />} />
            </Routes>
            <Routes>
                <Route path='/login' element={<Login />} />
            </Routes>
            {/* <UserList/> */}
        </>
    );
};

export default Pages;
