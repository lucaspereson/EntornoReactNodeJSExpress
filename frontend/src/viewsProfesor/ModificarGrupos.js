import React from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar.js";
import TableGroups from "../components/TableGroups.js";
import ResponsiveDrawer from "../components/ResponsiveDrawner.js";
const pages = [['Home', '/home'], ['Heramientas', '/herramientas'], ['Grupos', '/armar-grupos'], ['Reportes', '/reportes']];

function ModificarGrupos() {
  
  return (
    <React.Fragment >
        <div style={{marginTop: 100}}>
            ModificarGrupos
        </div>
      <ResponsiveAppBar pages={pages} />
      <ResponsiveDrawer Content={TableGroups} 
        MainOptions={['Armar grupos', 'Modificar grupos', 'Eliminar grupos' ,'Ruta de aprendizaje']} 
        SecondaryOptions={['Opción X', 'Opción Y', 'Opción Z']}/>
    </React.Fragment>
  );
}

export default ModificarGrupos;
