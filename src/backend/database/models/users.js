/* eslint-disable new-cap */
/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.belongsTo(models.roles);
      users.hasMany(models.polys);
      users.hasMany(models.queues);
    }
  };
  users.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING(156),
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING(15),
    description: DataTypes.TEXT,
    picture: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    isActive: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'users',
    timestamps: true,
  });
  return users;
};
