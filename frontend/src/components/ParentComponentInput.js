import React, { useState } from 'react';
import InputFileUpload from './InputFileUpload'; // Asegúrate de importar correctamente

function ParentComponentInput() {
  const [file, setFile] = useState(null);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    console.log('Archivo procesado en el componente padre:', selectedFile.name);
    // Aquí puedes hacer más operaciones con el archivo, como enviarlo a un backend
  };

  return (
    <div>
      <InputFileUpload onFileSelect={handleFileSelect} />
      {file && <p>Archivo seleccionado: {file.name}</p>}
    </div>
  );
}

export default ParentComponentInput;
