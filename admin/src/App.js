import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './App.css';
import Orders from './pages/Orders';
import LoginForm from './components/LoginForm/LoginForm'; 
import CreateUser from './pages/CreateUser/CreateUser';
import UpdateUser from './pages/UpdateUser/UpdateUser';

function App() {
  return (
    <>
    <Router>
       <Routes>
         <Route path="/admin" element={<LoginForm/>} />
         <Route path="/dashboard" element={< Orders/>} />
         <Route path="/dashboard/create" element={< CreateUser/>} />
         <Route path="/dashboard/update/:userId" element={< UpdateUser/>} />
         </Routes>
         </Router>
    </>
  );
}

export default App;
