const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Artist = sequelize.define('Artist', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Album = sequelize.define('Album', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Music = sequelize.define('Music', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Artist.hasMany(Album);
Album.belongsTo(Artist);

Album.hasMany(Music);
Music.belongsTo(Album);

sequelize.sync();

module.exports = { Artist, Album, Music, sequelize };
