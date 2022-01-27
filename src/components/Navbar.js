import axios from 'axios';
import Notiflix from 'notiflix';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authentication } from '../store';

function Navbar() {
  const [auth, setAuth] = useRecoilState(authentication);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      let response = await axios.post('/logout');
      localStorage.removeItem('userToken');
      setAuth({
        check: false,
        user: []
      })
      navigate('/login');
      Notiflix.Notify.success(response.data.message, { position: 'right-bottom' })
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container">
        <Link className="navbar-brand" to={'/'}>Realavel</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {
              auth.check ?
                <li className="nav-item">
                  <Link className="nav-link" to={'/dashboard'}>Dashboard</Link>
                </li>
                :
                <li className="nav-item">
                  <Link className="nav-link" to={'/'}>Home</Link>
                </li>
            }
            <li className="nav-item">
              <Link className="nav-link" to={'/about'}>About</Link>
            </li>
          </ul>
          {
            auth.check ?
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to={'/'}>{auth.user?.name}</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={logout}>Logout</button>
                </li>
              </ul>
              :
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to={'/login'}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/register'}>Register</Link>
                </li>
              </ul>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
