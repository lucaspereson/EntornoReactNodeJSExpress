import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs/promises';
import express, { json } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
const { sign } = jwt;
import { v4 as uuidv4 } from 'uuid'; // Para generar IDs únicos
const filePath = './files/users.json';
const app = express();

app.use(cors());
app.use(json());

app.get('/users', (req, res) => {
    fs.readFile(filePath, 'utf8')
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
    const { username, password } = req.body;
    try {
        // Leer el archivo JSON donde se almacenan los usuarios
        const data = await fs.readFile(filePath, 'utf8');
        const users = JSON.parse(data);

        // Verificar si el usuario ya existe
        if (users.find(user => user.username === username)) {
            return res.status(409).send('User already exists');
        }

        // Añadir el nuevo usuario al array
        const newUser = { id: uuidv4(), username, password };
        users.push({ username, password });

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
        const data = await fs.readFile(filePath, 'utf8');
        const users = JSON.parse(data);
        // Verificar si el usuario ya existe
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            const token = sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '10s' });
            res.status(200).json({ token })
        } else {
            res.status(401).send('Invalid credentials');
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
