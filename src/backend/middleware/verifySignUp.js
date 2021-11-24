const {baseResponse} = require('../base/index');
const db = require('../database/models');
const User = db.users;
const Role = db.roles;

checkDuplicateEmail = async (req, res, next) => {
  const required = [
    'email',
  ];

  try {
    required.forEach((requiredItem) => {
      if (!req.body[requiredItem]) {
        throw new Error(`Should contain ${requiredItem}`);
      }
    });

    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return baseResponse.error(res, 400, 'Email is already in use.');
    }
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
  next();
};

checkRoleExist = async (req, res, next) => {
  const required = [
    'roleId',
  ];

  try {
    required.forEach((requiredItem) => {
      if (!req.body[requiredItem]) {
        throw new Error(`Should contain ${requiredItem}`);
      }
    });

    const user = await Role.findOne({
      where: {
        id: req.body.roleId,
      },
    });

    if (!user) {
      return baseResponse.error(res, 400, 'Role id is not valid.');
    }
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
  next();
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkRoleExist: checkRoleExist,
};

module.exports = verifySignUp;
