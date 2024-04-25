import React, { useState, useEffect } from "react";
import InputFileUpload from "./InputFileUpload.js";
import DataTable from "./DataTable.js";
import useCsvToJson from "./useCsvToJson.js";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES as coreEsES } from '@mui/material/locale';
import { useHeaders } from "./HeadersProvider.js";
import { Typography, Box } from "@mui/material";

const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
  },
  coreEsES, // Localización española para los componentes de MUI
);

function TableGroups() {
    const [file, setFile] = useState(null);
    const handleFileSelect = (selectedFile) => {setFile(selectedFile);};
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const { csvData, isLoading, error } = useCsvToJson(file); 
    const [headers, setHeaders] = useHeaders();
    
    useEffect(() => {
        if (csvData && csvData.length > 0) {
          const head = Object.keys(csvData[0]);
          const newColumns = head.map((header) => ({
            field: header,
            headerName: header.toUpperCase(),
            width: 150,
            editable: true, // si quieres que las columnas sean editables
            required: true
          }))
          setHeaders(head);;
          setColumns(newColumns);
          setRows(csvData);
        }
      }, [csvData]); // Se ejecuta cuando 'data' cambia
    
    
    if (isLoading) {
      return <p>Cargando datos...</p>;
    };

  return (
    <Box sx={{
      border: 2, borderColor: 'primary.main', borderRadius: 1, paddingY: 3, paddingX: 3, boxShadow: 3, bgcolor: 'background.paper', marginY: 3, marginX: 10
      }}>
        <ThemeProvider theme={theme}>
          <Typography variant="h4" component="h1" sx={{ width: '100%', color: '#1F356C', marginTop: 1, marginBottom: 2, fontFamily: 'sans-serif', fontSize: 25, fontWeight: 'bold' }}>
              Datos de integrantes
          </Typography>
          {rows && columns ? (
            <DataTable columns={columns} rows={rows}/>
          ) : (<p>...</p>)}
          {isLoading ? (
              <p>Cargando datos...</p>
          ) : 
            error && error[0] === 1 ? (
            <p>Error al cargar los datos: {error[1]}</p>
          ) : 
            error && error[0] === 0 ? (
              <div>
                <p>{error[1]}. </p>
                <p>Seleccione un archivo para continuar.</p>
              </div>
            ) : null
          }
        </ThemeProvider>
        <InputFileUpload onFileSelect={handleFileSelect} />
        {file && (
          <div>
            <p>Archivo seleccionado: {file.name}</p>
          </div>
        )}
    </Box>
  );
}

export default TableGroups;
