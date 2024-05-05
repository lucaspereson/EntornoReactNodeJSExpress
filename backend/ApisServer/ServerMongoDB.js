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
    const { name, lastname, email, username, password, role } = req.body;

    try {
        if (await User.findOne({ username })) {
            return res.status(409).send('User already exists');
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const newUser = new User({ name, lastname, email, username, role, password: hashedPassword });
        await newUser.save();
        res.status(201).send('User created');
    } catch (err) {
        res.status(500).json(err.message);
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

app.post('/addNews', async (req, res) => {
    const { title, summary, imageUrl, link, content, datePublished, author } = req.body;
    try {
        const newNews = new News({ title, summary, imageUrl, link, content, datePublished, author });
        await newNews.save();
        res.status(201).send('News created');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

