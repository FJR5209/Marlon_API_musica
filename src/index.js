const express = require('express');
const path = require('path');  // Importar o módulo 'path'
const connectDB = require('./db');
const app = express();
const port = 3000;

const musicRoutes = require('./routes/musica');
const artistRoutes = require('./routes/artist');
const letraRoutes = require('./routes/letra');
const albumRoutes = require('./routes/album');

// Conectar ao MongoDB
connectDB();

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'musica_site')));

// Middleware para JSON
app.use(express.json());
app.use('/api/musics', musicRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/letras', letraRoutes);
app.use('/api/album', albumRoutes);

// Rota para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'musica_site', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
