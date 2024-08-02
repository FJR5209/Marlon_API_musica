const mongoose = require('mongoose');

const LetraSchema = new mongoose.Schema({
    songTitle: String,
    artist: String,
    lyrics: String,
    album: String
});

module.exports = mongoose.models.Letra || mongoose.model('Letra', LetraSchema);
