const mongoose = require('mongoose');

const ArtistaSchema = new mongoose.Schema({
    name: String,
    genre: String,
    albums: [String],
    songs: [String]
});

module.exports = mongoose.models.Artista || mongoose.model('Artista', ArtistaSchema);
