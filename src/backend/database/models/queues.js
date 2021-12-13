/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class queues extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      queues.belongsTo(models.users);
      queues.belongsTo(models.appointments);
      queues.belongsTo(models.queueStatuses);
    }
  };
  queues.init({
    userId: DataTypes.INTEGER,
    appointmentId: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    queue: DataTypes.INTEGER,
    isAssurance: DataTypes.INTEGER,
    picture1: DataTypes.STRING,
    picture2: DataTypes.STRING,
    picture3: DataTypes.STRING,
    picture4: DataTypes.STRING,
    picture5: DataTypes.STRING,
    queueStatusId: DataTypes.INTEGER,
    rejectMessage: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'queues',
    timestamps: true,
  });
  return queues;
};
