import express from 'express';
import cors from 'cors';
import fs from 'fs';
const filePath = './files/news.json'
const app = express();

app.use(cors()); // Habilita CORS para permitir que tu frontend acceda a la API
app.disable('x-powered-by')

app.get('/api/news', (req, res) => {
  // Suponiendo que processCSV devuelve los datos procesados como un objeto JSON
  fs.readFile(filePath, 'utf8', function(error, data) {
    if (error) {
        console.error('Error de procesamiento:', error);
        res.status(500).send(`Error de procesamiento: ${error.message}`)
    } else {
        const jsonData = JSON.parse(data)
        res.json(jsonData)}
    })
})

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
