import { Schema, model } from 'mongoose';

const newsSchema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    summary: { type: String, required: false },
    imageUrl: { type: String, required: false },
    link: { type: String, required: false },
    content: { type: String, required: false },
    datePublished: { type: Date, required: false },
    author: { type: String, required: false },
});

export default model('News', newsSchema);