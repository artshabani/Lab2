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
import Dashboard from './Dashboard/Dashboard';
import ContactUs from './ContactUs/ContactUs';
import ThankYou from './ContactUs/ThankYou';

const Pages = () => {
    return (
        <>
        <Navbar/>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/movies' element={<MovieList />} />
                <Route path='/movies/:id' element={<MovieDetails />} /> 
                <Route path='/PlayMovie/:id' element={<MoviePlayer />} /> 
                <Route path='/users/' element={<UserList />} /> 
                <Route path='/dashboard' element={<Dashboard />} /> 
                <Route path='/contactus' element={<ContactUs />} /> 
                <Route path='/thankyou' element={<ThankYou />} /> 
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </>
    );
};

export default Pages;
