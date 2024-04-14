import express from 'express';
import cors from 'cors';
const app = express();
import processCSV from './processCSV.js';

app.use(cors()); // Habilita CORS para permitir que tu frontend acceda a la API
app.disable('x-powered-by')

app.get('/api/process-csv', (req, res) => {
  // Suponiendo que processCSV devuelve los datos procesados como un objeto JSON
  processCSV('././files/username.csv')
  .then(data => {
    res.json(data);
  }).catch(error => {
    console.error('Error al procesar el CSV:', error);
    res.status(500).send(`Error procesando el CSV: ${error.message}`);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
