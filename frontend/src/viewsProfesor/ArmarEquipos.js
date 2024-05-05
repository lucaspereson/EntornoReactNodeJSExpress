import React from "react";
import AppBar from "../components/AppBar.js";
import TableGroups from "../components/TableGroups.js";
import HorizontalLinearStepper from "../components/HorizontalLinearStepper.js";
import TeamConfigurator from "../components/TeamConfigurator.js.js";
import GenerateTeams from "../components/GenerateTeams.js";
import { Typography } from "@mui/material";

function ArmarEquipos() {
  return (
    <React.Fragment>
        <AppBar />
        <Typography variant="h4" component="h1" sx={{ width: '100%', color: '#038cfc', marginTop: 12, marginBottom: -5, fontFamily: 'sans-serif', fontSize: 30, fontWeight: 'bold' }}>
            PROCESO DE ARMADO DE EQUIPOS
        </Typography>
        <HorizontalLinearStepper 
            Step1={() => <TableGroups />}
            Step2={() => <TeamConfigurator  />}
            Step3={() => <GenerateTeams />}
            />
    </React.Fragment>
  );
}

export default ArmarEquipos;
