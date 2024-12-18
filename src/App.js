import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';

function App() {
  return (
    <Routes>
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />

   </Routes>
  );
}

export default App;
