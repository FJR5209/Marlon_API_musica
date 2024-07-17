import Artista from '../../../Models/Artista';

export default async function handler(req, res) {
  const { id } = req.query;
  const artista = await Artista.findByPk(id);

  if (req.method === 'GET') {
    if (artista) {
      res.status(200).json(artista);
    } else {
      res.status(404).json({ error: 'Artista não encontrado' });
    }
  } else if (req.method === 'PUT') {
    if (artista) {
      await artista.update(req.body);
      res.status(200).json(artista);
    } else {
      res.status(404).json({ error: 'Artista não encontrado' });
    }
  } else if (req.method === 'DELETE') {
    if (artista) {
      await artista.destroy();
      res.status(200).json({ message: 'Artista removido com sucesso' });
    } else {
      res.status(404).json({ error: 'Artista não encontrado' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

