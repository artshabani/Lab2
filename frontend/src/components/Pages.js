import React from 'react';
import Signup from './auth/Signup/Signup';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Login from './auth/Login/Login';
import MovieList from './Movies/MovieList';
import MovieDetails from './Movies/MovieDetails';
import MoviePlayer from './Movies/MoviePlayer';
import UserList from './Users/UserList';
import HomePage from './HomePage';
import EditMovie from './Movies/EditMovie';
import Logs from './Logs/Logs';

import UserDetails from './Users/UserDetails';
import UserEdit from './Users/UserEdit';

import Dashboard from './Dashboard/Dashboard';
import ContactUs from './ContactUs/ContactUs';
import ThankYou from './ContactUs/ThankYou';

import Roles from './admin/Roles';
import CreateRole from './admin/CreateRole';
import EditUserInRole from './admin/EditUserInRole';
import Statistics from './admin/Statistics';
import Subscription from './Subscription/Subscription';
import CreateRoom from './room/CreateRoom'
import Room from './room/Room';
import AllRooms from './room/AllRooms';
import Community from './Community/Community';
import Topic from './Community/Topic';

const Pages = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/PlayMovie/:id" element={<MoviePlayer />} />
        <Route path="/users/" element={<UserList />} />
        <Route path="/UserDetails/:id" element={<UserDetails />} />
        <Route path="/EditUser/:id" element={<UserEdit />} />
        <Route path="/EditMovie/:id" element={<EditMovie />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/createrole" element={<CreateRole />} />
        <Route path="/edituserinrole/:roleId" element={<EditUserInRole />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/createroom/:movieid" element={<CreateRoom />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/rooms" element={<AllRooms />} />
        <Route path="/community" element={<Community />} />
        <Route path="/topic" element={<Topic />} />
      </Routes>
    </>
  );
};

export default Pages;
