const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    genre: { type: String, required: true },
});


module.exports = mongoose.models.Album || mongoose.model('Album', AlbumSchema);
