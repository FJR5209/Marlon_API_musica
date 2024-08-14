const express = require('express');
const router = express.Router();
const Musica = require('../models/musica');

/**
 * @swagger
 * components:
 *   schemas:
 *     Musica:
 *       type: object
 *       required:
 *         - title
 *         - artist
 *       properties:
 *         id:
 *           type: string
 *           description: ID da música gerado automaticamente pelo MongoDB
 *         title:
 *           type: string
 *           description: O título da música
 *         artist:
 *           type: string
 *           description: O nome do artista
 *         letra:
 *           type: string
 *           description: A letra da música
 *         album:
 *           type: string
 *           description: O nome do álbum
 *         genre:
 *           type: string
 *           description: O gênero da música
 *         releaseDate:
 *           type: string
 *           format: date
 *           description: A data de lançamento da música
 *       example:
 *         title: Imagine
 *         artist: John Lennon
 *         letra: Imagine all the people...
 *         album: Imagine
 *         genre: Rock
 *         releaseDate: 1971-09-09
 */

/**
 * @swagger
 * tags:
 *   name: Musicas
 *   description: API para gerenciar músicas
 */

/**
 * @swagger
 * /api/musics:
 *   get:
 *     summary: Retorna a lista de todas as músicas
 *     tags: [Musicas]
 *     responses:
 *       200:
 *         description: A lista de músicas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Musica'
 *       500:
 *         description: Erro ao buscar as músicas
 */
router.get('/', async (req, res) => {
    try {
        const musicas = await Musica.find();
        res.json(musicas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/musics:
 *   post:
 *     summary: Adiciona uma nova música
 *     tags: [Musicas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Musica'
 *     responses:
 *       201:
 *         description: A música foi adicionada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Musica'
 *       500:
 *         description: Erro ao adicionar a música
 */
router.post('/', async (req, res) => {
    try {
        const { title, artist, letra, album, genre, releaseDate } = req.body;
        const novaMusica = new Musica({ title, artist, letra, album, genre, releaseDate });
        await novaMusica.save();
        res.status(201).json(novaMusica);
    } catch (error) {
        console.error('Erro ao adicionar a música:', error);
        res.status(500).json({ message: 'Erro ao adicionar a música', error });
    }
});

module.exports = router;
