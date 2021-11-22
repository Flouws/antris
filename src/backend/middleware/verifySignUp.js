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
      return res.status(500).json({
        error: {
          code: 500,
          message: 'Email is already in use.',
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: {
        code: 500,
        message: error.message,
      },
    });
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
      return res.status(400).json({
        error: {
          code: 400,
          message: 'Role id is not valid.',
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: {
        code: 500,
        message: error.message,
      },
    });
  }
  next();
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkRoleExist: checkRoleExist,
};

module.exports = verifySignUp;
