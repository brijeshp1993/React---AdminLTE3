import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import 'admin-lte/dist/css/adminlte.min.css';
import profileImage from '../img/profileimage.png'
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/authSlice';
import 'admin-lte/dist/js/adminlte.min.js';


const DashboardLayout = ({ children }) => {
  useEffect(() => {
    // Initialize the treeview after the component mounts
    window.$(() => {
      window.$('[data-widget="treeview"]').Treeview?.('init');
    });
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="wrapper">
    {/* Navbar */}
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" data-widget="pushmenu" to="#" role="button">
            <i className="fas fa-bars"></i>
          </Link>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/" className="nav-link">Home</Link>
        </li>
      </ul>
    </nav>

    {/* Sidebar */}
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/" className="brand-link">
        <img src="/img/profileimage.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" />
        <span className="brand-text font-weight-light">AdminLTE</span>
      </Link>

      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-item">
              <Link to="/cities" className="nav-link">
                <i className="nav-icon fas fa-city"></i>
                <p>List of Cities</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/countries" className="nav-link">
                <i className="nav-icon fas fa-flag"></i>
                <p>List of Countries</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                <p>List of Users</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/departments" className="nav-link">
                <i className="nav-icon fas fa-building"></i>
                <p>List of Departments</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/jobs" className="nav-link">
                <i className="nav-icon fas fa-briefcase"></i>
                <p>List of Jobs</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    {/* Content Wrapper */}
    <div className="content-wrapper">
      {/* <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
          </div>
        </div>
      </div> */}

      <div className="content">
        <div className="container-fluid">
        {children}

        </div>
      </div>
    </div>

    {/* Footer */}
    <footer className="main-footer">
      <strong>Copyright &copy; 2024 <a href="https://github.com/brijeshp1993">Brijesh Patel</a>.</strong>
      All rights reserved.
    </footer>
  </div>
);
};

export default DashboardLayout;
