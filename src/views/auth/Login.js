import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authentication } from '../../store';

function Login() {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authentication);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const form = {
    email, password
  }
  const [errors, setErrors] = useState([]);
  const submit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post('/login', form);
      localStorage.setItem('userToken', response.data.token);
      setAuth({ check: true, user: response.data.data });
      navigate('/dashboard');
    } catch (e) {
      setAuth({ check: false });
      setErrors(e.response.data.errors)
    }
  }
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form onSubmit={submit}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" id='email' name='email' onChange={(e) => setEmail(e.target.value)} value={email} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                  {
                    errors.email ?
                      <div className="invalid-feedback">{errors.email[0]}</div>
                      : ''
                  }
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" id='password' name='password' onChange={(e) => setPassword(e.target.value)} value={password} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                  {
                    errors.password ?
                      <div className="invalid-feedback">{errors.password[0]}</div>
                      : ''
                  }
                </div>
                <button type='submit' className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
