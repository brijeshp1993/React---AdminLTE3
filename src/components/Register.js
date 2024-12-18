import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser,clearError,clearUser  } from '../reducers/authSlice';
import 'admin-lte/dist/css/adminlte.min.css';



const Register = () => {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[confirmpassword,setconfirmpassword]=useState('');
    const[firstname,setFirstName]=useState('');
    const[lastname,setLastName]=useState('');

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {isLoading,error}=useSelector((state)=>state.auth);

    const handleSubmit=(e)=>{

        e.preventDefault();
        if (password !== confirmpassword) {
            dispatch({
              type: 'auth/registerError',
              payload: 'Passwords do not match, Please try again!',
            });
            return;
          }
        const userData = {
            email,
            firstname,
            lastname,
            password,
          };
      
          dispatch(registerUser(userData))
            .unwrap().then(() => navigate('/login'))
            .catch(() => {});
    };

    

      useEffect(()=>{
        if (password !== confirmpassword) {
            dispatch({
              type: 'auth/registerError',
              payload: 'Passwords do not match',
            });
            return;
          }
          else{
            dispatch(clearError());
          }
      },[password,confirmpassword])

     useEffect(() => {
            // Clear any existing errors when the component mounts
            dispatch(clearError());
            dispatch(clearUser());

        }, []);

    return (
<div className='login-page'>
    <div className="register-box">
      <div className="register-logo">
        <b>Admin</b>LTE
      </div>
      <div className="card">
        <div className="card-body register-card-body">
          <p className="register-box-msg">Register in to start your session</p>
          {error && (
         <div className="alert alert-danger">
                {error.message || error}

            </div>)}

          <form onSubmit={handleSubmit} >
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
                type="text"
                className="form-control"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
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
            <div className="input-group mb-3">
            <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={(e) => setconfirmpassword(e.target.value)}
                required
              />
            </div>
            <div className="row">
              <div className="col-12">
                <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                  {isLoading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </div>
            </form><br/>
            <Link to="/login" className="text-center">I already have a membership</Link>

         </div>
    </div>
   </div>
 </div>
                  )
}

export default Register