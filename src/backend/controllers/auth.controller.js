/* eslint-disable max-len */
require('dotenv').config();
const {baseResponse} = require('../base/index');
const bcrypt = require('bcrypt');
const db = require('../database/models');
const User = db.users;
const Role = db.roles;
const jwt = require('jsonwebtoken');
const fs = require('fs');

const hashPassword = (password) => {
  return bcrypt.hashSync(password, parseInt(process.env.APP_ROUND_SALT));
};

exports.signup = async (req, res) => {
  const deleteImage = () => {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  };

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
  } catch (error) {
    deleteImage();
    return baseResponse.error(res, 400, error.message);
  }

  try {
    const picture = (req.file ? req.file.filename : undefined);

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword(req.body.password),
      address: req.body.address,
      phone: req.body.phone,
      description: req.body.description,
      picture: picture,
      roleId: req.body.roleId,
      isActive: req.body.isActive,
    });

    return baseResponse.ok(res, {
      message: 'User was created successfully.',
    });
  } catch (error) {
    deleteImage();
    return baseResponse.error(res, 500, error.message);
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
      include: Role,
    });

    if (!user) {
      return baseResponse.error(res, 404, 'User not found.');
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return baseResponse.error(res, 401, 'Invalid password!');
    }

    const accessToken = jwt.sign({
      uuid: user.uuid,
    }, process.env.APP_KEY, {
      expiresIn: parseInt(process.env.APP_SESSION_TIME),
    });

    return baseResponse.ok(res, {
      accessToken: accessToken,
      role: user.role.name,
      user: {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        address: user.address,
        picture: user.picture,
      },
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};
