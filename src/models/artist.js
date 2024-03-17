'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Artist.hasMany(models.ArtistFavourite, { foreignKey: 'artistId' });
    }
  }
  Artist.init({
    name: DataTypes.STRING,
    image: DataTypes.BLOB('long'),
  }, {
    sequelize,
    modelName: 'Artist',
    timestamps: false,
  });
  return Artist;
};