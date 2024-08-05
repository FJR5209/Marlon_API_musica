const mongoose = require('mongoose');

const LetraSchema = new mongoose.Schema({
    artist: { type: String, required: true },
    title: { type: String, required: true },
    letra: { type: String, required: true },
    album: { type: String, required: true },
    genre: String,
    releaseDate: Date
});

module.exports = mongoose.models.Letra || mongoose.model('Letra', LetraSchema);
