const express = require('express');
const router = express.Router();
const axios = require('axios');
const Letra = require('../models/letra');

// Buscar letra por artista, título ou álbum
router.get('/search', async (req, res) => {
    const { artist, title, album } = req.query;

    if (!artist && !title && !album) {
        return res.status(400).json({ message: 'Pelo menos um parâmetro (artist, title, album) é necessário' });
    }

    try {
        // Construir a consulta para MongoDB
        const query = {};
        if (artist) {
            query.artist = new RegExp(artist, 'i');
        }
        if (title) {
            query.title = new RegExp(title, 'i');
        }
        if (album) {
            query.album = new RegExp(album, 'i');
        }

        // Buscar no banco de dados
        const letras = await Letra.find(query);

        // Se encontrar no banco de dados
        if (letras.length > 0) {
            return res.json(letras);
        }

        // Se não encontrar no banco de dados, buscar na API do Vagalume
        const response = await axios.get('https://api.vagalume.com.br/search.artmus', {
            params: {
                q: `${artist || ''} ${title || ''} ${album || ''}`,
                limit: 5,
                apikey: 'YOUR_API_KEY'
            }
        });

        if (response.data.response.numFound === 0) {
            return res.status(404).json({ message: 'Letra não encontrada na API do Vagalume' });
        }

        // Ajusta o formato de resposta da API do Vagalume
        const letrasVagalume = response.data.response.docs.map(mus => ({
            artist: mus.band,
            title: mus.title,
            letra: '', // A API do Vagalume não fornece a letra completa nesta resposta
            album: ''
        }));

        res.json(letrasVagalume);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Atualizar uma letra
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { artist, title, letra, album, genre, releaseDate } = req.body;

    if (!artist || !title || !letra || !album) {
        return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
    }

    try {
        const letraAtualizada = await Letra.findByIdAndUpdate(id, {
            artist,
            title,
            letra,
            album,
            genre,
            releaseDate
        }, { new: true });

        if (!letraAtualizada) {
            return res.status(404).json({ message: 'Letra não encontrada' });
        }

        res.json(letraAtualizada);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deletar uma letra
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const letraDeletada = await Letra.findByIdAndDelete(id);

        if (!letraDeletada) {
            return res.status(404).json({ message: 'Letra não encontrada' });
        }

        res.json({ message: 'Letra deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
