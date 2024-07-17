const { DataTypes } = require('sequelize');
const sequelize = require('../lib/sequelize');
const Artista = require('./Artista');

const Album = sequelize.define('Album', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ano_lancamento: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_artista: {
    type: DataTypes.INTEGER,
    references: {
      model: Artista,
      key: 'id',
    },
    allowNull: false,
  },
});

module.exports = Album;

