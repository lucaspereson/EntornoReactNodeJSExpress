import React from 'react';
import {TextField, Box, Button, Typography} from '@mui/material';

export default function ContentModSectionModal(props) {
  const {data} = props;
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
        type='text'
        defaultValue={data.id}
      />
      <TextField
        size='small'
        id="title"
        label={<Typography sx={{fontSize:fontSizeAll}}>Titulo *</Typography>}
        type='text'
        defaultValue={data.title}
      />
      <TextField
        size='small'
        id="summary"
        label={<Typography sx={{fontSize:fontSizeAll}}>Resumen *</Typography>}
        type='text'
        defaultValue={data.summary}
      />
    <TextField
        size='small'
        id="imageUrl"
        label={<Typography sx={{fontSize:fontSizeAll}}>URL de la imagen *</Typography>}
        type='text'
        defaultValue={data.imageUrl}
      />
      <TextField
        size='small'
        id="link"
        label={<Typography sx={{fontSize:fontSizeAll}}>Link de redirección *</Typography>}
        type='text'
        defaultValue={data.link}
      />
    <TextField
        size='small'
        id="content"
        label={<Typography sx={{fontSize:fontSizeAll}}>Contenido * </Typography>}
        type='text'
        defaultValue={data.content}
      />
    <TextField
        size='small'
        id="datePublished"
        type='date'
        label={<Typography sx={{fontSize:fontSizeAll}}>Fecha de publicación *</Typography>}
        defaultValue={data.datePublished}
      />
    <TextField
        size='small'
        id="author"
        label={<Typography sx={{fontSize:fontSizeAll}}>Autor *</Typography>}
        type='text'
        defaultValue={data.author}
      />
      <Box sx={{width:'100%', display: 'flex', flexWrap: 'wrap', justifyContent:'space-between',  alignItems: 'center' }}>
        <Button variant="contained" type="submit" sx={{ mt:2, width: '48%', alignSelf: 'center', bgcolor: '#007FFF', '&:hover': {bgcolor: 'blue', }}}>
          <Typography sx={{fontSize:fontSizeAll}}>GUARDAR CAMBIOS</Typography>
        </Button>
        <Button variant="contained" type="submit" sx={{ mt:2, width: '48%', alignSelf: 'center', bgcolor: 'red', '&:hover': {bgcolor: '#7a3733', }}}>
          <Typography sx={{fontSize:fontSizeAll}}>ELIMINAR</Typography>
        </Button>
      </Box>
    </Box>
  );
}
