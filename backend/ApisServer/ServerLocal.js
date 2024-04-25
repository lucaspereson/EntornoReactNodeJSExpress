import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs/promises';
import fs2 from 'fs';
import express, { json } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
const { sign } = jwt;
import { v4 as uuidv4 } from 'uuid'; // Para generar IDs únicos
const filePathUsers = './files/users.json';
const filePathNews = './files/news.json'
const app = express();
const secretKey = process.env.JWT_SECRET;

app.use(cors());
app.use(json());

app.get('/users', (req, res) => {
    fs.readFile(filePathUsers, 'utf8')
        .then(data => {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        })
        .catch(error => {
            console.error('Error leyendo el archivo:', error);
            res.status(500).send(`Error procesando la solicitud: ${error.message}`);
        });
});

app.post('/register', async (req, res) => {
    const { name, lastname, email, username, password, role } = req.body;
    try {
        // Leer el archivo JSON donde se almacenan los usuarios
        const data = await fs.readFile(filePathUsers, 'utf8');
        const users = JSON.parse(data);
        
        // Verificar si el usuario ya existe
        if (users.find(user => user.username === username)) {
            return res.status(409).send('User already exists');
        }

        // Añadir el nuevo usuario al array
        const newUser = { id: uuidv4(), name, lastname, email, username, password, role };
        users.push(newUser);

        // Escribir el array actualizado de vuelta al archivo JSON
        await fs.writeFile('./files/users.json', JSON.stringify(users, null, 2), 'utf8');
        res.status(201).send('User created');

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Leer el archivo JSON donde se almacenan los usuarios
        const data = await fs.readFile(filePathUsers, 'utf8');
        const users = JSON.parse(data);
        // Verificar si el usuario ya existe
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            const token = generateNewToken(user);
            res.status(200).json({ token, user })
        } else {
            res.status(401).send('Invalid credentials');
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

function generateNewToken(user) {
    const newToken = sign({
        id: user.id, 
        username: user.username
    }, secretKey, { expiresIn: '1h' });

    return newToken;
};


function verifyToken(req, res, next) {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Se requiere un token para la autenticación." });
    }
    try {
      const payload = jwt.verify(token, secretKey);
      req.username = payload.username;
      req.newToken = generateNewToken(payload);
      next();
    } catch (error) {
      return res.status(403).json({ message: "Token inválido" });
    }
  }
  
  app.get("/protected", verifyToken, (req, res) => {
    return res.status(200).json({ message: "Acceso concedido", token: req.newToken });
  });


  app.get('/news', (req, res) => {
    // Suponiendo que processCSV devuelve los datos procesados como un objeto JSON
    fs2.readFile(filePathNews, 'utf8', function(error, data) {
      if (error) {
          console.error('Error de procesamiento:', error);
          res.status(500).send(`Error de procesamiento: ${error.message}`)
      } else {
          const jsonData = JSON.parse(data)
          res.json(jsonData)}
      })
  })

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
