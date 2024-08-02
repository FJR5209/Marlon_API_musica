const express = require('express');
const router = express.Router();
const Album = require('../models/album');

router.get('/', async (req, res) => {
    try {
        const albuns = await Album.find();
        res.json(albuns);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
