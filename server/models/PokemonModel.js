import mongoose from 'mongoose';

const PokemonSchema = mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: [String]
    },
    level: {
        type: Number,
        default: 1
    },
    evolution: {
        type: [String]
    },
    region:{
        type: String
    }
});

const Pokemon = mongoose.model('pokemon', PokemonSchema);

export default Pokemon;