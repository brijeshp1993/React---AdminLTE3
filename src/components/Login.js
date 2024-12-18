// src/components/Login.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser,clearError  } from '../reducers/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import 'admin-lte/dist/css/adminlte.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Login = () => {
  const[email,setEmail]=useState('')
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error,user } = useSelector((state) => state.auth);

 
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).unwrap();
   
     
  };
  useEffect(()=>{
    if(user!=null)
      {
        console.log('redirect to login')
        navigate("/");
      }  },[user])

      useEffect(() => {
        // Clear any existing errors when the component mounts
        dispatch(clearError());
      }, [dispatch]);

  return (
    <div className='login-page'>
    <div className="login-box">
      <div className="login-logo">
        <b>Admin</b>LTE
      </div>
      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Sign in to start your session</p>
          {error && (
       <div className="alert alert-danger">
            {typeof error === 'string' ? error : error.message || 'An error occurred'}
            </div>
              )}
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />              
            </div>
            <div className="row">
              <div className="col-12">
                <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
              </div>
            </div>
          </form>
          <br/>
            <Link to="/register" className="text-center">If you need to register, Please click here</Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;