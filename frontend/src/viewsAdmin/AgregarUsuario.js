import React from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar.js";
import AddUsers from "../components/AddUsers.js";
import ResponsiveDrawer from "../components/ResponsiveDrawner.js";
const pages = [['Home', '/homeAdmin'], ['Usuarios', '/agregar-usuario'], ['Modulos', '/modulos']];

function AgregarUsuario() {
  
  return (
    <React.Fragment>
      <ResponsiveAppBar pages={pages} />
      <ResponsiveDrawer Content={AddUsers} 
        MainOptions={['Agregar usuario', 'Modificar usuario', 'Eliminar usuario']} 
        SecondaryOptions={['Opción X', 'Opción Y', 'Opción Z']}/>
    </React.Fragment>
  );
}

export default AgregarUsuario;
