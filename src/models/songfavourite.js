'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SongFavourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SongFavourite.belongsTo(models.Song, {foreignKey: 'songId'})
    }
  }
  SongFavourite.init({
    songId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SongFavourite',
    timestamps: false,
  });
  return SongFavourite;
};