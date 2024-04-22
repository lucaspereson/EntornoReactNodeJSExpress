import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './viewsProfesor/HomePage';
import Login from './viewsAll/Login';
import ArmarGrupos from './viewsProfesor/ArmarGrupos';
import ModificarGrupos from './viewsProfesor/ModificarGrupos';

import HomePageAdmin from './viewsAdmin/HomePageAdmin';
import AgregarUsuario from './viewsAdmin/AgregarUsuario';
import ModificarUsuario from './viewsAdmin/ModificarUsuario';

function App() {
  return (
      <div className="App">
          <Routes>
            <Route path="/login"  element={<Login />} />
            <Route path="/"       element={<Navigate replace to="/login" />} />
            <Route element={<ProtectedRoute allowedRoles={['profesor']}  />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/armar-grupos" element={<ArmarGrupos />} />
              <Route path="/modificar-grupos" element={<ModificarGrupos />} />
              <Route path="/eliminar-grupos" element={<ArmarGrupos />} />
              <Route path="/ruta-de-aprendizaje" element={<ArmarGrupos />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={['admin']}  />}>
            <Route path="/homeAdmin" element={<HomePageAdmin />} />
              <Route path="/agregar-usuario" element={<AgregarUsuario />} />
              <Route path="/modificar-usuario" element={<ModificarUsuario />} />
            </Route>
          </Routes>
      </div>
  );
}

export default App;
            