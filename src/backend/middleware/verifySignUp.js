const {baseResponse} = require('../base/index');
const db = require('../database/models');
const User = db.users;
const Role = db.roles;
const fs = require('fs');

checkDuplicateEmail = async (req, res, next) => {
  const deleteImage = () => {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  };

  const required = [
    'email',
  ];
  try {
    required.forEach((requiredItem) => {
      if (!req.body[requiredItem]) {
        throw new Error(`Should contain ${requiredItem}`);
      }
    });
  } catch (error) {
    deleteImage();
    return baseResponse.error(res, 400, error.message);
  }

  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      deleteImage();
      return baseResponse.error(res, 400, 'Email is already in use.');
    }
  } catch (error) {
    deleteImage();
    return baseResponse.error(res, 500, error.message);
  }
  next();
};

checkRoleExist = async (req, res, next) => {
  const deleteImage = () => {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  };
  const required = [
    'roleId',
  ];
  try {
    required.forEach((requiredItem) => {
      if (!req.body[requiredItem]) {
        throw new Error(`Should contain ${requiredItem}`);
      }
    });
  } catch (error) {
    deleteImage();
    return baseResponse.error(res, 400, error.message);
  }

  try {
    const user = await Role.findOne({
      where: {
        id: req.body.roleId,
      },
    });

    if (!user) {
      deleteImage();
      return baseResponse.error(res, 400, 'Role id is not valid.');
    }
  } catch (error) {
    deleteImage();
    return baseResponse.error(res, 500, error.message);
  }
  next();
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkRoleExist: checkRoleExist,
};

module.exports = verifySignUp;
