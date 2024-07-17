const { DataTypes } = require('sequelize');
const sequelize = require('../lib/sequelize');
const Album = require('./Album');

const Musica = sequelize.define('Musica', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duracao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_album: {
    type: DataTypes.INTEGER,
    references: {
      model: Album,
      key: 'id',
    },
    allowNull: false,
  },
});

module.exports = Musica;
