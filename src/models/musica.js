const mongoose = require('mongoose');

const MusicaSchema = new mongoose.Schema({
    artist: String,    // Campo para o artista
    title: String,     // Campo para a música
    letra: String,     // Campo para a letra
    album: String,     // Campo para o álbum
    genre: String,     // Campo para o gênero (opcional)
    releaseDate: Date  // Campo para a data de lançamento (opcional)
});

module.exports = mongoose.models.Musica || mongoose.model('Musica', MusicaSchema);
