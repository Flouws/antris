/* eslint-disable new-cap */
/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class polyActiveDays extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      polyActiveDays.belongsTo(models.polys);
    }
  };
  polyActiveDays.init({
    polyId: DataTypes.INTEGER,
    monday: DataTypes.INTEGER(1),
    tuesday: DataTypes.INTEGER(1),
    wednesday: DataTypes.INTEGER(1),
    thursday: DataTypes.INTEGER(1),
    friday: DataTypes.INTEGER(1),
    saturday: DataTypes.INTEGER(1),
    sunday: DataTypes.INTEGER(1),
  }, {
    sequelize,
    modelName: 'polyActiveDays',
    timestamps: true,
  });
  return polyActiveDays;
};
