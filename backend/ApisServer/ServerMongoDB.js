require('dotenv').config();
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { genSalt, hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User, { findOne } from './models/UserSchema.js'; // Ver la definición del modelo más abajo

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = new User({ username, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).send('User created');
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await findOne({ username });

    if (user && await compare(password, user.password)) {
        const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(400).send('Invalid credentials');
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
