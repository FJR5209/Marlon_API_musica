const mongoose = require('mongoose');

const MusicaSchema = new mongoose.Schema({
    title: String,
    artist: String,
    letra: String,
    album: String,
    genre: String,
    releaseDate: Date
});

module.exports = mongoose.models.Musica || mongoose.model('Musica', MusicaSchema);
