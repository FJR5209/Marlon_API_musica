import Album from '../../../Models/Album';

export default async function handler(req, res) {
  const { id } = req.query;
  const album = await Album.findByPk(id);

  if (req.method === 'GET') {
    if (album) {
      res.status(200).json(album);
    } else {
      res.status(404).json({ error: 'Álbum não encontrado' });
    }
  } else if (req.method === 'PUT') {
    if (album) {
      await album.update(req.body);
      res.status(200).json(album);
    } else {
      res.status(404).json({ error: 'Álbum não encontrado' });
    }
  } else if (req.method === 'DELETE') {
    if (album) {
      await album.destroy();
      res.status(200).json({ message: 'Álbum removido com sucesso' });
    } else {
      res.status(404).json({ error: 'Álbum não encontrado' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

