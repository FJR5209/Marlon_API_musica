const express = require('express');
const router = express.Router();
const { Album, Artist } = require('../models');

// Rotas
router.get('/albums', async (req, res) => {
  const albums = await Album.findAll({ include: Artist });
  res.json(albums);
});

router.post('/albums', async (req, res) => {
  const { title, artistId } = req.body;
  const newAlbum = await Album.create({ title, ArtistId: artistId });
  res.json(newAlbum);
});

module.exports = router;
