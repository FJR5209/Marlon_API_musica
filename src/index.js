const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const musicRoutes = require('./routes/music');
const artistRoutes = require('./routes/artist');
const albumRoutes = require('./routes/album');

// Middleware para servir arquivos estáticos do diretório 'musica_site'
app.use(express.static(path.join(__dirname, '../musica_site')));

app.use(express.json());
app.use('/api', musicRoutes);
app.use('/api', artistRoutes);
app.use('/api', albumRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../musica_site/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
