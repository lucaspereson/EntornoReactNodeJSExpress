import {Button, Typography, Box} from '@mui/material';
import React, { useState } from 'react';

function GenerateTeams() {
    const [group, setGroup] = useState(false);
    const createGroup = () => {
        setGroup(true)}
    
    return (
        <Box sx={{
            border: 2, borderColor: 'primary.main', borderRadius: 1, paddingY:3, paddingX: 3, boxShadow: 3, bgcolor: 'background.paper', marginY: 3, marginX: 10
        }}>
            <Typography variant="h4" component="h1" sx={{ width: '100%', color: '#1F356C', marginTop: 1, marginBottom: 2, fontFamily: 'sans-serif', fontSize: 25, fontWeight: 'bold' }}>
                FORMACIÓN DE EQUIPOS
            </Typography>
            <Button onClick={createGroup} variant="contained" sx={{ mt: 3, mb: 1, width: 'auto', alignSelf: 'center', bgcolor: '#007FFF', '&:hover': { bgcolor: 'blue', } }}>
                {group ? ( "VOLVER A GENERAR EQUIPOS" ) : ("GENERAR EQUIPOS")}
            </Button> 
                
        </Box>    
    );
}
export default GenerateTeams;