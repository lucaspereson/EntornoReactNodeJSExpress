import React from 'react';
import {TextField, Box, Button, Typography} from '@mui/material';
import { useState } from 'react';
import BasicAlert from './BasicAlert';

export default function ContentAddSectionModal() {
  const fontSizeAll = 13;
  const now = new Date();
  const localDateISOString = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [link, setLink] = useState('');
  const [content, setContent] = useState('');
  const [datePublished, setDatePublished] = useState(localDateISOString);
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/addNews', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, summary, imageUrl, link, content, datePublished, author })
      });
      if (!response.ok) {
          const errorData = await response.json(); // Intenta obtener más detalles del error del cuerpo de la respuesta
          throw new Error(errorData.message || 'Fallo en el registro');
      }
      const result = await response.text();
      console.log(result);
      showBasicAlert('success', 'Noticia cargada correctamente');      
    } catch (error) {
        showBasicAlert('error', `El registro de la nueva noticia falló`);
        console.log('error.message');
        console.log(error.message);
    }
  };

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ severity: '', message: '' });

  const handleAlertClose = () => {
      setAlertOpen(false);
  };

  const showBasicAlert = (severity, message) => {
      setAlertInfo({ severity, message });
      setAlertOpen(true);
  };

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
      onSubmit={handleSubmit}
    >
      <TextField
        size='small'
        id="title"
        label={<Typography sx={{fontSize:fontSizeAll}}>Titulo *</Typography>}
        type='text'
        value={title} onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        size='small'
        id="summary"
        label={<Typography sx={{fontSize:fontSizeAll}}>Resumen *</Typography>}
        type='text'
        value={summary} onChange={(e) => setSummary(e.target.value)}
      />
    <TextField
        size='small'
        id="imageUrl"
        label={<Typography sx={{fontSize:fontSizeAll}}>URL de la imagen *</Typography>}
        type='text'
        value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
      />
    <TextField
        size='small'
        id="link"
        label={<Typography sx={{fontSize:fontSizeAll}}>Link de redirección *</Typography>}
        type='url'
        value={link} onChange={(e) => setLink(e.target.value)}

      />
    <TextField
        size='small'
        id="content"
        label={<Typography sx={{fontSize:fontSizeAll}}>Contenido * </Typography>}
        type='text'
        value={content} onChange={(e) => setContent(e.target.value)}
      />
    <TextField
        size='small'
        id="datePublished"
        type='date'
        label={<Typography sx={{fontSize:fontSizeAll}}>Fecha de publicación *</Typography>}
        value={datePublished} onChange={(e) => setDatePublished(e.target.value)}
      />
    <TextField
        size='small'
        id="author"
        label={<Typography sx={{fontSize:fontSizeAll}}>Autor *</Typography>}
        type='text'
        value={author} onChange={(e) => setAuthor(e.target.value)}
      />
      <Button variant="contained" type="submit" sx={{ mt:2, width: '100%', alignSelf: 'center', bgcolor: '#007FFF', '&:hover': {bgcolor: 'blue', }}}>
        <Typography sx={{fontSize:fontSizeAll}}>Agregar Sección</Typography>
      </Button>
      <BasicAlert
              open={alertOpen}
              handleClose={handleAlertClose}
              severity={alertInfo.severity}
              message={alertInfo.message}
          />
    </Box>
  );
}
