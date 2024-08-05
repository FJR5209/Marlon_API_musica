const express = require('express');
const router = express.Router();
const Album = require('../models/album');

// Rota para buscar todos os álbuns
router.get('/', async (req, res) => {
    try {
        const albums = await Album.find();
        res.json(albums);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar álbuns.' });
    }
});


module.exports = router;
