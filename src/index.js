const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const musicRoutes = require('./routes/music');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Servir arquivos estáticos do diretório 'musica_site'
app.use(express.static(path.join(__dirname, '../musica_site')));

// MongoDB connection
mongoose.connect('mongodb+srv://juniorfredson5209:IfacaMarlonN1@apimarlon.5civmep.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Rotas da API
app.use('/api/music', musicRoutes);

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../musica_site', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
