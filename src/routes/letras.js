const express = require('express');
const router = express.Router();
const axios = require('axios');
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

// Buscar letra por artista e título da música na API do Vagalume
router.get('/vagalume', async (req, res) => {
    const { artist, title } = req.query;

    if (!artist || !title) {
        return res.status(400).json({ message: 'Artist and title are required' });
    }

    try {
        const response = await axios.get(`https://api.vagalume.com.br/search.php`, {
            params: {
                art: artist,
                mus: title,
                apikey: '6962e0e1188263a8d48396eda98fe895' // substitua pela sua chave de API
            }
        });

        if (response.data.type === 'notfound') {
            return res.status(404).json({ message: 'Letra não encontrada na API do Vagalume' });
        }

        const letra = response.data.mus[0].text;
        res.json({ artist, title, letra });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
