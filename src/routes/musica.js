const express = require('express');
const router = express.Router();
const Musica = require('../models/musica');

// Rota GET para listar todas as músicas
router.get('/', async (req, res) => {
    try {
        const musicas = await Musica.find();
        res.json(musicas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota POST para adicionar uma nova música
router.post('/', async (req, res) => {
    try {
        const { title, artist, letra, album, genre, releaseDate } = req.body;
        const novaMusica = new Musica({ title, artist, letra, album, genre, releaseDate });
        await novaMusica.save();
        res.status(201).json(novaMusica);
    } catch (error) {
        console.error('Erro ao adicionar a música:', error);
        res.status(500).json({ message: 'Erro ao adicionar a música', error });
    }
});

module.exports = router;
