import Album from '../../../Models/Album';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const albuns = await Album.findAll();
    res.status(200).json(albuns);
  } else if (req.method === 'POST') {
    const novoAlbum = await Album.create(req.body);
    res.status(201).json(novoAlbum);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

