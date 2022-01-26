import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import About from '../views/About';
import Login from '../views/auth/Login';
import Register from '../views/auth/Register';
import Home from '../views/Home';
function Router() {
  return <div>
    <BrowserRouter>
      <Navbar />
      <div className="py-5">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  </div>;
}

export default Router;
