import React from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar.js";
import TableGroups from "../components/TableGroups.js";
import ResponsiveDrawer from "../components/ResponsiveDrawner.js";
const pages = [['Home', '/home'], ['Heramientas', '/herramientas'], ['Grupos', '/armar-grupos'], ['Reportes', '/reportes']];

function ArmarGrupos() {
  
  return (
    <React.Fragment>
      <ResponsiveAppBar pages={pages} />
      <ResponsiveDrawer Content={TableGroups} 
        MainOptions={['Armar grupos', 'Modificar grupos', 'Eliminar grupos' ,'Ruta de aprendizaje']} 
        SecondaryOptions={['Opción X', 'Opción Y', 'Opción Z']}/>
    </React.Fragment>
  );
}

export default ArmarGrupos;
