/* eslint-disable max-len */
require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../database/models');
const User = db.users;
const Role = db.roles;
const jwt = require('jsonwebtoken');

const hashPassword = (password) => {
  return bcrypt.hashSync(password, parseInt(process.env.APP_ROUND_SALT));
};

exports.signup = async (req, res) => {
  const required = [
    'name',
    'email',
    'password',
    'roleId',
  ];

  try {
    required.forEach((requiredItem) => {
      if (!req.body[requiredItem]) {
        throw new Error(`Should contain ${requiredItem}`);
      }
    });

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword(req.body.password),
      address: req.body.address,
      picture: req.body.picture,
      roleId: req.body.roleId,
      isActive: req.body.isActive,
    });

    return res.status(200).json({
      success: {
        code: 200,
        data: {
          message: 'User was created successfully.',
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        code: 500,
        message: error.message,
      },
    });
  }
};

exports.signin = async (req, res) => {
  const required = [
    'email',
    'password',
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

    if (!user) {
      return res.status(404).json({
        error: {
          code: 404,
          message: 'User not found.',
        },
      });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        error: {
          code: 401,
          message: 'Invalid password!',
        },
      });
    }

    const userRole = await Role.findOne({
      where: {
        id: user.roleId,
      },
    });

    const accessToken = jwt.sign({
      uuid: user.uuid,
    }, process.env.APP_KEY, {
      expiresIn: parseInt(process.env.APP_SESSION_TIME),
    });

    return res.status(200).json({
      success: {
        code: 200,
        data: {
          accessToken: accessToken,
          role: userRole.name,
          user: {
            uuid: user.uuid,
            name: user.name,
            email: user.email,
            address: user.address,
            picture: user.picture,
          },
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        code: 500,
        message: error.message,
      },
    });
  }
};
