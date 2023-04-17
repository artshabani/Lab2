import React from 'react';
import Signup from './auth/Signup/Signup';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'
import Navbar from './Navbar/Navbar';
import Login from './auth/Login/Login'
import MovieList from './Movies/MovieList';
import MovieDetails from './Movies/MovieDetails';
import MoviePlayer from './Movies/MoviePlayer'; 
import UserList from './Users/UserList'; 
import HomePage from './HomePage';

const Pages = () => {
    return (
        <>
        <Navbar/>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/movies' element={<MovieList />} />
                <Route path='/movies/:id' element={<MovieDetails />} /> 
                <Route path='/PlayMovie/:id' element={<MoviePlayer />} /> 
                <Route path='/users/' element={<UserList />} /> 
            </Routes>
        </>
    );
};

export default Pages;
