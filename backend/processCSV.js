// csvProcessor.js
import fs from 'fs';
import { parse } from 'csv-parse';

const processCSV = (csvFilePath) => {
  return new Promise((resolve, reject) => {
    // Crear un stream de lectura
    const readStream = fs.createReadStream(csvFilePath);

    // Parser para convertir CSV a JSON
    const parser = parse({
      columns: true, // Opción para convertir cada fila en un objeto
      delimiter: ';', // Delimitador de campos en el CSV
      trim: true, // Trim espacios de cada campo
    });

    // Array donde almacenar los objetos JSON
    let jsonArray = [];

    // Leer el CSV y parsear cada línea
    readStream.pipe(parser)
      .on('data', (row) => {
        jsonArray.push(row);
      })
      .on('end', () => resolve(jsonArray))
        // Procesamiento completado
    
      .on('error', (error) => reject(error));
  });
};

export default processCSV;

