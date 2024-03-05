'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SongOfPlaylist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SongOfPlaylist.init({
    songId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SongOfPlaylist',
    timestamps: false,
  });
  return SongOfPlaylist;
};