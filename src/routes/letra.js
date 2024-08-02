const express = require('express');
const router = express.Router();
const Letra = require('../models/letra');

router.get('/', async (req, res) => {
    try {
        const letras = await Letra.find();
        res.json(letras);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
