import React from "react";
import AppBar from "../components/AppBar.js";
import { Typography } from "@mui/material";

function Planificacion() {
    return (
        <React.Fragment>
            <AppBar />
            <Typography variant="h4" component="h1" sx={{ width: '100%', color: '#038cfc', marginTop: 12, marginBottom: -5, fontFamily: 'sans-serif', fontSize: 30, fontWeight: 'bold' }}>
                PLANIFICACIÓN
            </Typography>

        </React.Fragment>
    );
}

export default Planificacion;
