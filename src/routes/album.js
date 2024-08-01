// src/routes/album.js
const express = require('express');
const router = express.Router();
const Album = require('../models/Album');

router.get('/', async (req, res) => {
  try {
    const albums = await Album.find().populate('artistId', 'name');
    res.json(albums);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, artistId } = req.body;
    const newAlbum = new Album({ title, artistId });
    const savedAlbum = await newAlbum.save();
    res.json(savedAlbum);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
