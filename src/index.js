const express = require('express');
const path = require('path');  // Importar o módulo 'path'
const connectDB = require('./db');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

const musicRoutes = require('./routes/musica');
const artistRoutes = require('./routes/artist');
const letraRoutes = require('./routes/letras');  // Ajuste aqui para corresponder ao nome correto do arquivo de rotas
const albumRoutes = require('./routes/album');

// Conectar ao MongoDB
connectDB();

// Configurações do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Music API',
      version: '1.0.0',
      description: 'API para gerenciar músicas, artistas, letras e álbuns',
      contact: {
        name: 'Seu Nome',
      },
      servers: [`http://localhost:${port}`],
    },
  },
  apis: ['./src/routes/*.js'], // Caminho para os arquivos de rotas onde as definições estão
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'musica_site')));
// Serve arquivos estáticos da pasta 'swagger-ui'
app.use('/swagger-ui', express.static(path.join(__dirname, 'swagger/swagger-ui')));


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
