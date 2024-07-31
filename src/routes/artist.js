const express = require('express');
const router = express.Router();
const { Artist } = require('../models');

router.get('/', async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const newArtist = await Artist.create({ name });
    res.json(newArtist);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
