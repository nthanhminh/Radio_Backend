'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.hasMany(models.SongFavourite, {foreignKey : 'songId'})
      Song.hasMany(models.SongOfPlaylist, {foreignKey : 'songId'})
    }
  }
  Song.init({
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    image: DataTypes.BLOB('long'),
    data: DataTypes.BLOB('long'),
  }, {
    sequelize,
    modelName: 'Song',
    timestamps: false,
  });
  return Song;
};