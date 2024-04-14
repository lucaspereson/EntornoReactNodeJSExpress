import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { v4 as uuidv4 } from 'uuid';

const useCsvToJson = (file) => {
  const [csvData, setCsvData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const convertCsvToJson = () => {
      if (!file) {
        setError([0, "No hay datos para mostrar"]);
        setCsvData(null);
        return;
      }

      setLoading(true);
      setError(null);

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const dataWithId = results.data.map(row => ({
            Legajo: row.Legajo || uuidv4(),
            ...row
          }));
          setCsvData(dataWithId);
          setLoading(false);
        },
        error: (err) => {
          setError([1, err]);
          setLoading(false);
        }
      });
    };

    convertCsvToJson();
    // Agrega una función de limpieza si es necesario, por ejemplo, para cancelar el parseo si aún está en curso

  }, [file]); // El efecto se ejecuta solo cuando el archivo cambia

  return { csvData, isLoading, error };
};

export default useCsvToJson;
