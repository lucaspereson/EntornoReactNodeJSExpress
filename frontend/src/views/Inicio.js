import React from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar.js";
import ComponentInicio from "../components/ComponentInicio.js";
import ResponsiveDrawer from "../components/ResponsiveDrawner.js";
const pages = ['Inicio', 'Herramientas', 'Formularios', 'Reportes'];

function Inicio() {
  
  return (
    <React.Fragment>
      <ResponsiveAppBar pages={pages} />
      <ResponsiveDrawer Content={ComponentInicio} />
    </React.Fragment>
  );
}

export default Inicio;
