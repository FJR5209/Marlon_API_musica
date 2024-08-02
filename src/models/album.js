const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
    title: String,
    artist: String,
    releaseDate: Date,
    genre: String,
    songs: [String]
});

module.exports = mongoose.models.Album || mongoose.model('Album', AlbumSchema);
