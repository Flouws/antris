/* eslint-disable max-len */
require('dotenv').config();
const {baseResponse} = require('../base/index');
const bcrypt = require('bcrypt');
const db = require('../database/models');
const User = db.users;
const Poly = db.polys;
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const hashPassword = (password) => {
  return bcrypt.hashSync(password, parseInt(process.env.APP_ROUND_SALT));
};

exports.getProfile = async (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return baseResponse.error(res, 403, 'No access token provided.');
  }

  try {
    const decodedToken = jwt.decode(token);

    const user = await User.findOne({
      where: {
        uuid: decodedToken.uuid,
      },
    });

    return baseResponse.ok(res, {
      user: {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        address: user.address,
        picture: user.picture,
        isActive: (user.isActive && user.isActive > 0 ? true : false),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.editProfile = async (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return baseResponse.error(res, 403, 'No access token provided.');
  }

  try {
    const decodedToken = jwt.decode(token);
    const password = (req.body.password ? hashPassword(req.body.password) : undefined);
    const picture = (req.file ? req.file.filename : undefined);

    const user = await User.findOne({
      where: {
        uuid: decodedToken.uuid,
      },
    });

    if (picture && user.picture && fs.existsSync(path.join(__dirname, `../public/uploads/users/pictures/${user.picture}`))) {
      fs.unlinkSync(path.join(__dirname, `../public/uploads/users/pictures/${user.picture}`));
    }

    await User.update({
      name: req.body.name,
      password: password,
      address: req.body.address,
      picture: picture,
      isActive: req.body.isActive,
    }, {
      where: {
        uuid: decodedToken.uuid,
      },
    });

    return baseResponse.ok(res, {
      message: 'Profile updated successfully.',
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.deleteProfile = async (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return baseResponse.error(res, 403, 'No access token provided.');
  }

  try {
    const decodedToken = jwt.decode(token);

    const user = await User.findOne({
      where: {
        uuid: decodedToken.uuid,
      },
    });

    if (user.picture && fs.existsSync(path.join(__dirname, `../public/uploads/users/pictures/${user.picture}`))) {
      fs.unlinkSync(path.join(__dirname, `../public/uploads/users/pictures/${user.picture}`));
    }

    await User.destroy({
      where: {
        uuid: decodedToken.uuid,
      },
    });

    return baseResponse.ok(res, {
      message: 'Profile deleted successfully.',
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.addPoly = async (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return baseResponse.error(res, 403, 'No access token provided.');
  }

  const required = [
    'name',
    'doctor',
    'capacity',
  ];
  try {
    required.forEach((requiredItem) => {
      if (!req.body[requiredItem]) {
        throw new Error(`Should contain ${requiredItem}`);
      }
    });
  } catch (error) {
    return baseResponse.error(res, 400, error.message);
  }

  try {
    const decodedToken = jwt.decode(token);

    const user = await User.findOne({
      where: {
        uuid: decodedToken.uuid,
      },
    });

    await Poly.create({
      userId: user.id,
      name: req.body.name,
      doctor: req.body.doctor,
      capacity: req.body.capacity,
    });

    return baseResponse.ok(res, {
      message: 'Poly created successfully.',
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.editPoly = async (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return baseResponse.error(res, 403, 'No access token provided.');
  }

  try {
    const decodedToken = jwt.decode(token);

    const user = await User.findOne({
      where: {
        uuid: decodedToken.uuid,
      },
    });

    const poly = await Poly.findOne({
      where: {
        id: req.params.id,
        userId: user.id,
      },
    });

    if (!poly) {
      return baseResponse.error(res, 404, 'Poly not found.');
    }

    await Poly.update({
      name: req.body.name,
      doctor: req.body.doctor,
      capacity: req.body.capacity,
    }, {
      where: {
        id: req.params.id,
        userId: user.id,
      },
    });

    return baseResponse.ok(res, {
      message: 'Poly updated successfully.',
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.home = (req, res) => {
  return baseResponse.ok(res, {
    message: 'User Home',
  });
};
