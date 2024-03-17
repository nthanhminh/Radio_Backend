'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaylistCreated extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PlaylistCreated.belongsTo(models.Playlist, {foreignKey: 'playlistId'})
    }
  }
  PlaylistCreated.init({
    playlistId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PlaylistCreated',
    timestamps: false,
  });
  return PlaylistCreated;
};