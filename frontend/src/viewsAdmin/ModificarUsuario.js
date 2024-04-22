import React from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar.js";
import TableGroups from "../components/TableGroups.js";
import ResponsiveDrawer from "../components/ResponsiveDrawner.js";
const pages = [['Home', '/homeAdmin'], ['Usuarios', '/agregar-usuario'], ['Modulos', '/modulos']];

function ModificarUsuario() {
  
  return (
    <React.Fragment>
      <ResponsiveAppBar pages={pages} />
      <ResponsiveDrawer Content={TableGroups} 
        MainOptions={['Agregar usuario', 'Modificar usuario', 'Eliminar usuario']} 
        SecondaryOptions={['Opción X', 'Opción Y', 'Opción Z']}/>
    </React.Fragment>
  );
}

export default ModificarUsuario;
