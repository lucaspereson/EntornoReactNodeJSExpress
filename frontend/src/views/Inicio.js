import React from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar.js"

const pages = ['Herramientas', 'Formularios', 'Reportes'];

function Inicio() {
  return (
          
        <React.Fragment>
            <ResponsiveAppBar pages={pages} />
        </React.Fragment>
  );
}

export default Inicio;
