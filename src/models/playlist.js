'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Playlist.hasMany(models.PlaylistFavourite,{ foreignKey: 'playlistId'})
      Playlist.hasMany(models.PlaylistCreated,{ foreignKey: 'playlistId'})
    }
  }
  Playlist.init({
    name: DataTypes.STRING,
    image: DataTypes.BLOB('long'),
  }, {
    sequelize,
    modelName: 'Playlist',
    timestamps: false,
  });
  return Playlist;
};