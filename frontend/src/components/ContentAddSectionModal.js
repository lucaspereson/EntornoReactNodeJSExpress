import React from 'react';
import {TextField, Box, Button, Typography} from '@mui/material';

export default function ContentAddSectionModal() {
  const fontSizeAll = 13;
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { marginX: 0, marginY: 1, width: '48%' }, 
        display: 'flex',  // Habilita flexbox
        flexWrap: 'wrap', // Permite el salto de línea
        justifyContent:'space-between', // Justifica el contenido de manera uniforme
        alignItems: 'center' // Centra los elementos verticalmente
        ,mt:2
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        size='small'
        id="id"
        label={<Typography sx={{fontSize:fontSizeAll}}>Identificador *</Typography>}
        type='number'
      />
      <TextField
        size='small'
        id="title"
        label={<Typography sx={{fontSize:fontSizeAll}}>Titulo *</Typography>}
        type='text'
      />
      <TextField
        size='small'
        id="summary"
        label={<Typography sx={{fontSize:fontSizeAll}}>Resumen *</Typography>}
        type='text'
      />
    <TextField
        size='small'
        id="imageUrl"
        label={<Typography sx={{fontSize:fontSizeAll}}>URL de la imagen *</Typography>}
        type='text'
      />
    <TextField
        size='small'
        id="content"
        label={<Typography sx={{fontSize:fontSizeAll}}>Contenido * </Typography>}
        type='text'
      />
    <TextField
        size='small'
        id="datePublished"
        type='date'
      />
    <TextField
        size='small'
        id="author"
        label={<Typography sx={{fontSize:fontSizeAll}}>Autor *</Typography>}
        type='text'
      />
      <Button variant="contained" type="submit" sx={{ mt:2, width: '100%', alignSelf: 'center', bgcolor: '#007FFF', '&:hover': {bgcolor: 'blue', }}}>
        <Typography sx={{fontSize:fontSizeAll}}>Agregar Sección</Typography>
      </Button>
    </Box>
  );
}
