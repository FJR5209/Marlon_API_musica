const express = require('express');
const router = express.Router();
const Music = require('../models/music');

// Rota para obter todas as músicas
router.get('/', async (req, res) => {
  try {
    const musics = await Music.find();
    res.json(musics);
  } catch (error) {
    console.error('Error fetching musics:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Rota para adicionar uma nova música
router.post('/', async (req, res) => {
  try {
    const { title, artist, album, genre, releaseDate } = req.body;
    const newMusic = new Music({ title, artist, album, genre, releaseDate });
    await newMusic.save();
    res.status(201).json(newMusic);
  } catch (error) {
    console.error('Error creating music:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
