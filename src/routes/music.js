const express = require('express');
const router = express.Router();
const { Music, Album } = require('../models');

// Rotas
router.get('/musics', async (req, res) => {
  const musics = await Music.findAll({ include: Album });
  res.json(musics);
});

router.post('/musics', async (req, res) => {
  const { title, year, albumId } = req.body;
  const newMusic = await Music.create({ title, year, AlbumId: albumId });
  res.json(newMusic);
});

module.exports = router;
