import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { Routes, Route,Navigate, useLocation } from 'react-router-dom';
import Register from './components/Register';
import Cities from './components/Cities';
import Countries from './components/Countries';
import Users from './components/Users';
import { useSelector } from 'react-redux';
import DashboardLayout from './components/_layout';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Correct path for Font Awesome


const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const loginUser = useSelector((state) => state.auth.user);

  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';
  //const isAuthenticated = Boolean(localStorage.getItem('user'));

  return (
    <div className={isAuthRoute ? 'hold-transition login-page' : 'hold-transition sidebar-mini layout-fixed layout-footer-fixed'}>

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes with DashboardLayout */}
     {/* <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="cities" element={<Cities />} />
        <Route path="countries" element={<Countries />} />
        <Route path="users" element={<Users />} />
      <Route index element={<Navigate to="/users" replace />} /> Default page

      </Route>*/}

<Route
        path="/*"
        element={ loginUser ?  (
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<Users />} />
              <Route path="/cities" element={<Cities />} />
              <Route path="/countries" element={<Countries />} />
              <Route path="/users" element={<Users />} />
           
            </Routes>
          </DashboardLayout>
        ) : (
          <Navigate to="/login" />
        )}
      />

      {/* Redirect to login if no route matches */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
    </div>
  );
};

export default App;
