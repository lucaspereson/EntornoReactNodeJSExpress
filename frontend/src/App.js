import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './views/HomePage';
import Login from './views/Login';
import Inicio from './views/Inicio';

function App() {
  return (
      <div className="App">
          <Routes>
            <Route path="/login"  element={<Login />} />
            <Route path="/"       element={<Navigate replace to="/login" />} />
            <Route path="/"       element={<ProtectedRoute  />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/inicio" element={<Inicio />} />
            </Route>
          </Routes>
      </div>
  );
}

export default App;
            