import React, { useState } from 'react';
import { TextField, Box, Button, Typography, MenuItem } from '@mui/material';
import BasicAlert from './BasicAlert';
import BasicModal from './BasicModal';

export default function ContentModSectionModal(props) {
  const { data } = props;
  const [id, setId] = useState(data.id);
  const [type, setType] = useState(data.type);
  const [title, setTitle] = useState(data.title);
  const [summary, setSummary] = useState(data.summary);
  const [imageUrl, setImageUrl] = useState(data.imageUrl);
  const [link, setLink] = useState(data.link);
  const [content, setContent] = useState(data.content);
  const [datePublished, setDatePublished] = useState(data.datePublished);
  const [author, setAuthor] = useState(data.author);


  const types = [{ value: 'article', label: 'Articulo' },
  { value: 'video', label: 'Video' }];
  const fontSizeAll = 13;

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5001/updateNews/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, summary, imageUrl, link, content, datePublished, author })
      });
      if (!response.ok) {
        const errorData = await response.json(); // Intenta obtener más detalles del error del cuerpo de la respuesta
        throw new Error(errorData.message || 'Fallo en la actualizacion');
      }
      const result = await response.text();
      console.log(result);
      showBasicAlert('success', 'Noticia actualizada correctamente');
    } catch (error) {
      showBasicAlert('error', `La actualizacion de la noticia falló`);
      console.log('error.message');
      console.log(error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5001/deleteNews/${id}`, {
        method: 'DELETE', // Usar el método DELETE para eliminar recursos
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar la noticia');
      }
      const result = await response.text();
      console.log(result);
      showBasicAlert('success', 'Noticia eliminada correctamente');
    } catch (error) {
      showBasicAlert('error', 'Error al eliminar la noticia');
      console.error(error.message);
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
        justifyContent: 'space-between', // Justifica el contenido de manera uniforme
        alignItems: 'center' // Centra los elementos verticalmente
        , mt: 2
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        size='small'
        id="type"
        label={<Typography sx={{ fontSize: fontSizeAll }}>Tipo de sección *</Typography>}
        select
        SelectProps={{
          sx: { textAlign: 'left' },
          MenuProps: {
            sx: { textAlign: 'left' }
          }
        }}
        value={type} onChange={(e) => setType(e.target.value)}
      >
        {types.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        size='small'
        id="title"
        label={<Typography sx={{ fontSize: fontSizeAll }}>Titulo *</Typography>}
        type='text'
        value={title} onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        size='small'
        id="summary"
        label={<Typography sx={{ fontSize: fontSizeAll }}>Resumen *</Typography>}
        type='text'
        value={summary} onChange={(e) => setSummary(e.target.value)}
      />
      <TextField
        size='small'
        id="imageUrl"
        label={<Typography sx={{ fontSize: fontSizeAll }}>URL de la imagen *</Typography>}
        type='text'
        value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
      />
      <TextField
        size='small'
        id="link"
        label={<Typography sx={{ fontSize: fontSizeAll }}>Link de redirección *</Typography>}
        type='text'
        value={link} onChange={(e) => setLink(e.target.value)}
      />
      <TextField
        size='small'
        id="content"
        label={<Typography sx={{ fontSize: fontSizeAll }}>Contenido * </Typography>}
        type='text'
        value={content} onChange={(e) => setContent(e.target.value)}
      />
      <TextField
        size='small'
        id="datePublished"
        type='date'
        label={<Typography sx={{ fontSize: fontSizeAll }}>Fecha de publicación *</Typography>}
        value={datePublished} onChange={(e) => setDatePublished(e.target.value)}
      />
      <TextField
        size='small'
        id="author"
        label={<Typography sx={{ fontSize: fontSizeAll }}>Autor *</Typography>}
        type='text'
        value={author} onChange={(e) => setAuthor(e.target.value)}
      />
      <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button variant="contained" type="button" onClick={handleUpdate} sx={{ mt: 2, width: '48%', alignSelf: 'center', bgcolor: '#007FFF', '&:hover': { bgcolor: 'blue', } }}>
          <Typography sx={{ fontSize: fontSizeAll }}>GUARDAR CAMBIOS</Typography>
        </Button>
        <Button variant="contained" type="button" onClick={handleDelete} sx={{ mt: 2, width: '48%', alignSelf: 'center', bgcolor: 'red', '&:hover': { bgcolor: '#7a3733', } }}>
          <Typography sx={{ fontSize: fontSizeAll }}>ELIMINAR</Typography>
        </Button>
      </Box>
      <BasicAlert
        open={alertOpen}
        handleClose={handleAlertClose}
        severity={alertInfo.severity}
        message={alertInfo.message}
      />
    </Box>
  );
}
