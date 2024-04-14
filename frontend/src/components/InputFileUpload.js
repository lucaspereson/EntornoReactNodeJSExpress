import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({ onFileSelect }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Archivo seleccionado:', file.name);
      onFileSelect(file);  // Llama a la función pasada por el componente padre
    }
  };
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      CARGAR ARCHIVO .CSV
      <VisuallyHiddenInput 
        type="file" 
        onChange={handleFileChange}
        accept=".csv"/>
    </Button>
  );
}
