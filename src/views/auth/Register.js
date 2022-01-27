import axios from 'axios';
import Notiflix from 'notiflix';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const formData = {
    name, email, password, password_confirmation
  }
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post('/register', formData);
      navigate('/login');
      Notiflix.Report.success('Congratulations!', `${response.data.message} You can login now!`)
    } catch (e) {
      setErrors(e.response.data.errors);
    }
  }
  return <div className='container'>
    <div className="row d-flex justify-content-center">
      <div className='col-md-4'>
        <div className="card">
          <div className="card-header">
            Register
          </div>
          <div className="card-body">
            <form onSubmit={submit}>
              <div className="mb-4">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name} id='name' name='name' className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                {
                  errors.name ?
                    <div className="invalid-feedback">{errors.name[0]}</div>
                    : ''
                }
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} id='email' name='email' className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                {
                  errors.email ?
                    <div className="invalid-feedback">{errors.email[0]}</div>
                    : ''
                }
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} id='password' name='password' className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                {
                  errors.password ?
                    <div className="invalid-feedback">{errors.password[0]}</div>
                    : ''
                }
              </div>
              <div className="mb-4">
                <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
                <input type="password" onChange={(e) => setPasswordConfirmation(e.target.value)} value={password_confirmation} id='password_confirmation' name='password_confirmation' className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                {
                  errors.password_confirmation ?
                    <div className="invalid-feedback">{errors.password_confirmation[0]}</div>
                    : ''
                }
              </div>
              <button type='submit' className="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

export default Register;
