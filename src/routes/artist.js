const express = require('express');
const router = express.Router();
const Artista = require('../models/artista');

router.get('/', async (req, res) => {
    try {
        const artistas = await Artista.find();
        res.json(artistas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
