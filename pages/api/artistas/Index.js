// pages/api/artistas/index.js
import Artista from '../../../Models/Artista';
import syncDatabase from '../../../Models'; // Certifique-se de que o caminho esteja correto e use a mesma capitalização

export default async function handler(req, res) {
  await syncDatabase(); // Sincroniza o banco de dados

  if (req.method === 'GET') {
    const artistas = await Artista.findAll();
    res.status(200).json(artistas);
  } else if (req.method === 'POST') {
    const { nome, genero, nacionalidade, data_nascimento } = req.body;
    const novoArtista = await Artista.create({ nome, genero, nacionalidade, data_nascimento });
    res.status(201).json(novoArtista);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
