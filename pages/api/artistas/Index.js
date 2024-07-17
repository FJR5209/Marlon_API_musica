import syncDatabase from '../../../models/Index'; // Importa a função syncDatabase do arquivo index.js dentro de models

import Artista from '../../../models/Artista'; // Importa o modelo Artista
// import Album from '../../../models/Album'; // Importa o modelo Album
// import Musica from '../../../models/Musica'; // Importa o modelo Musica

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
