import React, { useState, useEffect } from 'react';

const CsvProcessor = () => {
  const [csvData, setCsvData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para cargar los datos del CSV
  const loadCsvData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/process-csv');
      
      if (!response.ok) {
        throw new Error('Algo salió mal al cargar los datos del CSV');
      }

      const data = await response.json();
      setCsvData(data); // Asumiendo que el backend devuelve un array de objetos
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar los datos del CSV cuando el componente se monta
  useEffect(() => {
    loadCsvData();
  }, []);

  // Renderizar datos del CSV o mostrar estado de carga/error
  return csvData
};

export default CsvProcessor;
