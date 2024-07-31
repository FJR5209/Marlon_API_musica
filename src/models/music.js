const express = require('express');
const router = express.Router();
const { Music } = require('../models');

// Adiciona uma nova música
router.post('/', async (req, res) => {
  try {
    const { title, artist, album, genre, releaseDate } = req.body;
    // Crie a música no banco de dados
    const music = await Music.create({
      title,
      artist,
      album,
      genre,
      releaseDate
    });
    // Retorne a música criada com um status de sucesso
    res.status(201).json(music);
  } catch (error) {
    console.error('Error adding music:', error);
    // Retorne um erro se algo der errado
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Lista todas as músicas
router.get('/', async (req, res) => {
  try {
    // Encontre todas as músicas no banco de dados
    const musics = await Music.findAll();
    // Retorne a lista de músicas com um status de sucesso
    res.status(200).json(musics);
  } catch (error) {
    console.error('Error fetching musics:', error);
    // Retorne um erro se algo der errado
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
