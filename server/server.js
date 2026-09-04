import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import Pokemon from './models/PokemonModel.js'
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const app = express();
mongoose.connect(MONGO_URI).then(() => { console.log('Mongo DB Connected') }).catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.get('/api/pokemon', async (req, res) => {
    const pokedex = await Pokemon.find();
    res.json(pokedex);
});

app.post('/api/pokemon', async (req, res) => {
    const catchPokemon = await Pokemon.create(req.body);
    res.json(catchPokemon);
});

app.put('/api/pokemon/train/:id', async (req, res) => {
    const id = req.params.id;
    const getPokemon = await Pokemon.findById(id);
    const newLevel = getPokemon.level + 33 >= 100 ? 100 : getPokemon.level+33;
    const myNameIs = getPokemon.evolution.includes(getPokemon.name)
        ? newLevel >= 100
            ? getPokemon.evolution[getPokemon.evolution.length - 1]
            : newLevel >= 50
                ? getPokemon.evolution[1]
                : getPokemon.evolution[0]
        : getPokemon.name;
    const trainedPokemon = await Pokemon.findByIdAndUpdate(id, { level: newLevel,name:myNameIs }, { returnDocument: 'after' });
    res.json(trainedPokemon);
});

app.put('/api/pokemon/:id', async (req, res) => {
    const id = req.params.id;
    const evolvedPokemon = await Pokemon.findByIdAndUpdate(id, req.body,{ returnDocument: 'after' });
    res.json(evolvedPokemon);
});

app.delete('/api/pokemon/:id', async (req, res) => {
    const releasePokemon = await Pokemon.findByIdAndDelete(req.params.id, { returnDocument: 'after' });
    res.json(releasePokemon);
});

app.listen(process.env.PORT, () => {
    console.log(`Listening to the port ${PORT}`);
});