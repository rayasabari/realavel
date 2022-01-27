import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Navbar from '../components/Navbar';
import { authentication } from '../store';
import About from '../views/About';
import Login from '../views/auth/Login';
import Register from '../views/auth/Register';
import Dashboard from '../views/Dashboard';
import Home from '../views/Home';
function Router() {
  const auth = useRecoilValue(authentication);
  return <div>
    <BrowserRouter>
      <Navbar />
      <div className="py-5">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/dashboard" element={auth.check ? <Dashboard /> : <Navigate to={'/login'} />}></Route>
          <Route path="/login" element={!auth.check ? <Login /> : <Navigate to={'/'} />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  </div>;
}

export default Router;
