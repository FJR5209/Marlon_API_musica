import Musica from '../../../Models/Musica';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const musicas = await Musica.findAll();
    res.status(200).json(musicas);
  } else if (req.method === 'POST') {
    const novaMusica = await Musica.create(req.body);
    res.status(201).json(novaMusica);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

