// src/index.js
const express = require('express');
const connectDB = require('./db');
const app = express();
const port = 3000;

const musicRoutes = require('./routes/music');
const artistRoutes = require('./routes/artist');
const albumRoutes = require('./routes/album');

connectDB(); // Conectar ao MongoDB

app.use(express.json());
app.use('/api/musics', musicRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/albums', albumRoutes);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
