import sequelize from '../../lib/sequelize';
import Artista from '../../models/Artista';

export default async function handler(req, res) {
  await sequelize.sync({ force: true }); // Sincroniza o banco de dados

  if (req.method === 'GET') {
    try {
      const artistas = await Artista.findAll();
      res.status(200).json(artistas);
    } catch (error) {
      console.error('Erro ao buscar artistas:', error);
      res.status(500).json({ error: 'Erro ao buscar artistas.' });
    }
  } else if (req.method === 'POST') {
    try {
      const { nome, genero, nacionalidade, data_nascimento } = req.body;
      const novoArtista = await Artista.create({ nome, genero, nacionalidade, data_nascimento });
      res.status(201).json(novoArtista);
    } catch (error) {
      console.error('Erro ao criar artista:', error);
      res.status(500).json({ error: 'Erro ao criar artista.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
