import sequelize from '../../lib/sequelize';
import Artista from '../../Models/Artista';
import Album from '../../Models/Album';
import Musica from '../../Models/Musica';

export default async function handler(req, res) {
  await sequelize.sync({ force: true });
  res.status(200).json({ message: 'Banco de dados sincronizado!' });
}
