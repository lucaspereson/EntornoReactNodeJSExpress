import React, { useState, useEffect } from "react";
import InputFileUpload from "./InputFileUpload.js";
import DataTable from "./DataTable.js";
import useCsvToJson from "./useCsvToJson.js";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES as coreEsES } from '@mui/material/locale';
import { useTeams } from "./TeamsProvider.js";
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

function Table(props) {
    const {data} = props
    
    const [columns, setColumns] = useState(null);
    const [rows, setRows] = useState(null);
    
    useEffect(() => {
        if (data && data.length > 0) {
          const head = Object.keys(data[0]);
          const newColumns = head.map((header) => ({
            field: header,
            headerName: header.toUpperCase(),
            width: 150,
            editable: true, // si quieres que las columnas sean editables
            required: true
          }))
          setColumns(newColumns);
          setRows(data);
        }
      }, [data]); // Se ejecuta cuando 'data' cambia
    
    

  return (
    <Box >
        <ThemeProvider theme={theme}>
            {console.log(data)}
          {rows && columns ? (
            <DataTable columns={columns} rows={rows}/>
          ) : "null"}
        </ThemeProvider>
    </Box>
  );
}

export default Table;
