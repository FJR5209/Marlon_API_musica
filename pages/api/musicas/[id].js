import Musica from '../../../Models/Musica';

export default async function handler(req, res) {
  const { id } = req.query;
  const musica = await Musica.findByPk(id);

  if (req.method === 'GET') {
    if (musica) {
      res.status(200).json(musica);
    } else {
      res.status(404).json({ error: 'Música não encontrada' });
    }
  } else if (req.method === 'PUT') {
    if (musica) {
      await musica.update(req.body);
      res.status(200).json(musica);
    } else {
      res.status(404).json({ error: 'Música não encontrada' });
    }
  } else if (req.method === 'DELETE') {
    if (musica) {
      await musica.destroy();
      res.status(200).json({ message: 'Música removida com sucesso' });
    } else {
      res.status(404).json({ error: 'Música não encontrada' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

