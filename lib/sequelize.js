// lib/sequelize.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'musica.db',
  logging: console.log, // Mostra logs no console para depuração
});

export default sequelize;
