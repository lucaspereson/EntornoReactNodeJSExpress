// TeamConfigurator.js
import React from 'react';
import { Box, TextField, MenuItem, Typography, Button } from '@mui/material';
import { useHeaders } from './HeadersProvider';

function TeamConfigurator() {
    const [headers] = useHeaders();
    const criterios = [
        {value: '0', label: 'No considerar',},
        {value: '1', label: 'Al menos 1',},
        {value: '2', label: 'Al menos 2',}
        ];
    const propiedades = [ 
        {value: '0', label: 'Cantidad de equipos', type: 'number'},
        {value: '1', label: 'Propiedad X', type: 'text'},
        {value: '2', label: 'Propiedad Y', type: 'text'},]

    return (
        <Box sx={{
            border: 2, borderColor: 'primary.main', borderRadius: 1, paddingY: 3, paddingX: 3, boxShadow: 3, bgcolor: 'background.paper', marginY: 3, marginX: 10
        }}>
            <Typography variant="h4" component="h1" sx={{ width: '100%', color: '#1F356C', marginTop: 1, marginBottom: 2, fontFamily: 'sans-serif', fontSize: 20, fontWeight: 'bold' }}>
                CONFIGURACIÓN DE EQUIPOS
            </Typography>
            <Box component="form" sx={{ '& .MuiTextField-root': { m: '1.5%', width: '100%' }, display: 'flex', flexWrap: 'wrap', justifyContent: 'normal', alignItems: 'center', bgcolor: '#e6eaff'}} noValidate autoComplete="off">
                <Typography variant="h4" component="h1" sx={{ width: '100%', color: '#738cff', marginTop: 1, marginBottom: 2, fontFamily: 'sans-serif', fontSize: 17, fontWeight: 'bold' }}>
                    CRITERIOS DE AGRUPACIÓN
                </Typography>
                {headers.map((header, index) => (
                    <Box sx={{ width: '30%', margin: 2 }}>
                        <Typography variant="h4" component="h1" sx={{ width: '100%', color: 'black', marginTop: 1, marginBottom: 0, fontFamily: 'sans-serif', fontSize: 15, fontWeight: 'bold' }}>
                            {header}
                        </Typography>
                        <TextField
                            id={`campo-${index}`}
                            select
                            defaultValue=''
                            label={<Typography sx={{fontSize: 15}}>Seleccione un criterio de agrupación</Typography>}
                            variant="outlined"
                            SelectProps={{
                                sx: { textAlign: 'left' },
                                MenuProps: {
                                    sx: { textAlign: 'left' }
                                }
                            }}
                        >
                            {criterios.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                ))}
            </Box>
            <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: '1.5%', width: '100%' }, // Ajusta el margen y el ancho para que quepan dos por fila
                  display: 'flex',  // Habilita flexbox
                  flexWrap: 'wrap', // Permite el salto de línea
                  justifyContent:'normal', // Justifica el contenido de manera uniforme
                  alignItems: 'center', // Centra los elementos verticalmente
                  bgcolor: '#e6eaff',
                  padding:0, mt:3,
                }}
                noValidate
                autoComplete="off"
              >
                <Typography  variant="h4" component="h1" sx={{ width:'100%', color: '#738cff', marginTop: 1, marginBottom:2, fontFamily:'sans-serif', fontSize:15, fontWeight: 'bold'}} >
                  PROPIEDADES
                </Typography>
                {propiedades.map((propiedad, index) => (
                    <Box sx={{ width: '30%', margin: 2 }}>
                        <Typography variant="h4" component="h1" sx={{ width: '100%', color: 'black', marginTop: 1, marginBottom: 0, fontFamily: 'sans-serif', fontSize: 15, fontWeight: 'bold' }}>
                            {propiedad.label}
                        </Typography>
                        <TextField
                            required
                            id={`campo-${index}`}
                            defaultValue='1'
                            type={propiedad.type} 
                            InputLabelProps={{shrink: true,}}
                            inputProps={{min: "0", step: "1" }}
                        />
                    </Box>
                ))}
              </Box>        


            {/* Aquí puedes agregar más elementos de UI relacionados con la configuración si es necesario */}
            <Button variant="contained" sx={{ mt: 3, mb: 1, width: 'auto', alignSelf: 'center', bgcolor: '#007FFF', '&:hover': { bgcolor: 'blue', } }}>
                Guardar configuración
            </Button>
        </Box>
    );
}

export default TeamConfigurator;
