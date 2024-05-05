import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './viewsProfesor/HomePage';
import Login from './viewsAll/Login';
import ArmarEquipos from './viewsProfesor/ArmarEquipos';
import ModificarEquipos from './viewsProfesor/ModificarEquipos';
import { TeamsProvider } from './components/TeamsProvider';
import HomePageAdmin from './viewsAdmin/HomePageAdmin';
import AgregarUsuario from './viewsAdmin/AgregarUsuario';
import ModificarUsuario from './viewsAdmin/ModificarUsuario';
import Planificacion from './viewsProfesor/Planificacion';
import MyCalendar from './viewsAll/PublicPlanificacion';

function App() {
  return (
    <div className="App">
      <TeamsProvider>
        <Routes>
          <Route path="/planification/:id" element={<MyCalendar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route element={<ProtectedRoute allowedRoles={['profesor']} />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/armar-equipos" element={<ArmarEquipos />} />
            <Route path="/modificar-equipos" element={<ModificarEquipos />} />
            <Route path="/eliminar-equipos" element={<ArmarEquipos />} />
            <Route path="/ruta-de-aprendizaje" element={<ArmarEquipos />} />
            <Route path="/planificacion" element={<Planificacion />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/homeAdmin" element={<HomePageAdmin />} />
            <Route path="/agregar-usuario" element={<AgregarUsuario />} />
            <Route path="/modificar-usuario" element={<ModificarUsuario />} />
          </Route>
        </Routes>
      </TeamsProvider>
    </div>
  );
}

export default App;
