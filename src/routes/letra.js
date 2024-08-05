const express = require('express');
const router = express.Router();
const Letra = require('../models/letra');

// Adicionar uma nova letra
router.post('/', async (req, res) => {
    const { artist, title, letra, album, genre, releaseDate } = req.body;

    if (!artist || !title || !letra || !album) {
        return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
    }

    const novaLetra = new Letra({
        artist,
        title,
        letra,
        album,
        genre,
        releaseDate
    });

    try {
        const letraSalva = await novaLetra.save();
        res.status(201).json(letraSalva);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Buscar todas as letras
router.get('/', async (req, res) => {
    try {
        const letras = await Letra.find();
        res.json(letras);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
