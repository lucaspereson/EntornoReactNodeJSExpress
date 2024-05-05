import {Button, Typography, Box} from '@mui/material';
import React, { useState } from 'react';
import { useTeams } from './TeamsProvider.js';
import Table from './Table.js';

function GenerateTeams() {
    const [group, setGroup] = useState(false);
    const [headers, setHeaders, file, setFile, dataStudents, setDataStudents] = useTeams();
    const [data, setData] = useState(null);
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    const createGroup = () => {
        setGroup(true)
        setData(dataStudents.map(row => ({
            Equipo: getRandomNumber(1, 4),
            ...row
          })));
        //logica de generacion des equipos

        }
    
    return (
        <Box sx={{
            border: 2, borderColor: 'primary.main', borderRadius: 1, paddingY:3, paddingX: 3, boxShadow: 3, bgcolor: 'background.paper', marginY: 3, marginX: 10
        }}>
            <Typography variant="h4" component="h1" sx={{ width: '100%', color: '#1F356C', marginTop: 1, marginBottom: 1, fontFamily: 'sans-serif', fontSize: 25, fontWeight: 'bold' }}>
                FORMACIÓN DE EQUIPOS
            </Typography>
            {group ? <Table data={data}/> : null}
            <Button onClick={createGroup} variant="contained" sx={{ mt: 1, mb: 1, width: 'auto', alignSelf: 'center', bgcolor: '#007FFF', '&:hover': { bgcolor: 'blue', } }}>
                {group ? ( "VOLVER A GENERAR EQUIPOS" ) : ("GENERAR EQUIPOS")}
            </Button> 
                
        </Box>    
    );
}
export default GenerateTeams;