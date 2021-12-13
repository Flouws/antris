/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class appointments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      appointments.belongsTo(models.polys);
      appointments.hasMany(models.queues);
    }
  };
  appointments.init({
    polyId: DataTypes.INTEGER,
    day: DataTypes.INTEGER,
    timeStart: DataTypes.TIME,
    timeEnd: DataTypes.TIME,
  }, {
    sequelize,
    modelName: 'appointments',
    timestamps: true,
  });
  return appointments;
};
