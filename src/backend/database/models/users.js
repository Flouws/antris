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
    }
  };
  users.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
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
