import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const HookCsvData = () => {
  const [csvData, setCsvData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCsvData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/process-csv');
      
      if (!response.ok) {
        throw new Error('Algo salió mal al cargar los datos del CSV');
      }

      const data = await response.json();
      const dataWithId = data.map(row => ({
        Legajo: row.Legajo || uuidv4(),
        ...row
      }))
      
      setCsvData(dataWithId);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCsvData();
  }, []);
  return { csvData, isLoading, error };
};

export default HookCsvData;
