const express = require('express');
const router = express.Router();
const Musica = require('../models/musica');

router.get('/', async (req, res) => {
    try {
        const musicas = await Musica.find();
        res.json(musicas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
