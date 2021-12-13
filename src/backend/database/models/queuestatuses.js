/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class queueStatuses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      queueStatuses.hasMany(models.queues);
    }
  };
  queueStatuses.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'queueStatuses',
    timestamps: true,
  });
  return queueStatuses;
};
