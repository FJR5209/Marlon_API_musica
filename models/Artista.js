const { DataTypes } = require('sequelize');
const sequelize = require('../lib/sequelize');

const Artista = sequelize.define('Artista', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nacionalidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Artista;

