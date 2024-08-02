const express = require('express');
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
app.use(express.static('src/public'));

app.use(express.json());
app.use('/api/musics', musicRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/letras', letraRoutes);
app.use('/api/albums', albumRoutes);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
