import React, { useState, useEffect } from "react";
import InputFileUpload from "./InputFileUpload.js";
import DataTable from "./DataTable.js";
import useCsvToJson from "./useCsvToJson.js";

function TableGroups() {
  
  //Utilizacion del boton input para cargar el archivo
    const [file, setFile] = useState(null);
    const handleFileSelect = (selectedFile) => {
      setFile(selectedFile);
  };

  //Utilizacion del hook personalizado para cargar los datos del CSV
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const { csvData, isLoading, error } = useCsvToJson(file); // Uso del hook personalizado

  useEffect(() => {
        if (csvData && csvData.length > 0) {
          const headers = Object.keys(csvData[0]);
          const newColumns = headers.map((header) => ({
            field: header,
            headerName: header.toUpperCase(),
            width: 150,
            editable: true, // si quieres que las columnas sean editables
            required: true
          }));
          setColumns(newColumns);
          setRows(csvData);
          
        }
      }, [csvData]); // Se ejecuta cuando 'data' cambia

      if (isLoading) {
        return <p>Cargando datos...</p>;
      };
    
      /*if (error) {
        return <p>Error al cargar los datos: {error}</p>;
      }*/
  
  return (
    <React.Fragment>
      {rows && columns ? (
        <DataTable  columns={columns} rows={rows}/>
      ) : (
        <p>...</p>
      )}
      
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
      
      <InputFileUpload onFileSelect={handleFileSelect} />
      {file && <p>Archivo seleccionado: {file.name}</p>}

    </React.Fragment>
  );
}

export default TableGroups;
