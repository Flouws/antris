/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class polys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      polys.belongsTo(models.users);
    }
  };
  polys.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    doctor: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'polys',
    timestamps: true,
  });
  return polys;
};
