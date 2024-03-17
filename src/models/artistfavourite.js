'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArtistFavourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ArtistFavourite.belongsTo(models.Artist, { foreignKey: 'artistId' });
    }
  }
  ArtistFavourite.init({
    artistId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ArtistFavourite',
    timestamps: false,
  });
  return ArtistFavourite;
};