/* eslint-disable max-len */
require('dotenv').config();
const {baseResponse} = require('../base/index');
const bcrypt = require('bcrypt');
const db = require('../database/models');
const User = db.users;
const Poly = db.polys;
const PolyActiveDays = db.polyActiveDays;
const {Op} = require('sequelize');
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

exports.getAllPoly = async (req, res) => {
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

    const poly = await Poly.findAll({
      where: {
        userId: {
          [Op.eq]: [user.id],
        },
      },
      attributes: {
        exclude: [
          'userId',
        ],
      },
    });

    if (!poly[0]) {
      return baseResponse.error(res, 404, 'You don\'t have any poly.');
    }

    return baseResponse.ok(res, {
      polys: poly,
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.getPoly = async (req, res) => {
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

    return baseResponse.ok(res, {
      poly: {
        id: poly.id,
        name: poly.name,
        doctor: poly.doctor,
        capacity: poly.capacity,
        createdAt: poly.createdAt,
        updatedAt: poly.updatedAt,
      },
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

exports.deletePoly = async (req, res) => {
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

    await Poly.destroy({
      where: {
        id: req.params.id,
        userId: user.id,
      },
    });

    return baseResponse.ok(res, {
      message: 'Poly deleted successfully.',
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.addPolyActiveDay = async (req, res) => {
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
        id: req.params.polyId,
        userId: user.id,
      },
    });

    if (!poly) {
      return baseResponse.error(res, 404, 'Poly not found.');
    }

    const polyActiveDay = await PolyActiveDays.findOne({
      where: {
        polyId: req.params.polyId,
      },
    });

    if (polyActiveDay) {
      return baseResponse.error(res, 400, `Active day for poly with id ${req.params.polyId} already available.`);
    }

    await PolyActiveDays.create({
      polyId: req.params.polyId,
      monday: req.body.monday,
      tuesday: req.body.tuesday,
      wednesday: req.body.wednesday,
      thursday: req.body.thursday,
      friday: req.body.friday,
      saturday: req.body.saturday,
      sunday: req.body.sunday,
    });

    return baseResponse.ok(res, {
      message: `Active day for poly with id ${req.params.polyId} has been created successfully.`,
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.getPolyActiveDay = async (req, res) => {
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
        id: req.params.polyId,
        userId: user.id,
      },
    });

    if (!poly) {
      return baseResponse.error(res, 404, 'Poly not found.');
    }

    const polyActiveDay = await PolyActiveDays.findOne({
      where: {
        polyId: {
          [Op.eq]: [req.params.polyId],
        },
      },
    });

    if (!polyActiveDay) {
      return baseResponse.error(res, 404, `Active day for poly with id ${req.params.polyId} is not found.`);
    }

    return baseResponse.ok(res, {
      polyActiveDay: {
        id: polyActiveDay.id,
        polyId: polyActiveDay.polyId,
        monday: (polyActiveDay.monday > 0 ) ? true : false,
        tuesday: (polyActiveDay.tuesday > 0 ) ? true : false,
        wednesday: (polyActiveDay.wednesday > 0 ) ? true : false,
        thursday: (polyActiveDay.thursday > 0 ) ? true : false,
        friday: (polyActiveDay.friday > 0 ) ? true : false,
        saturday: (polyActiveDay.saturday > 0 ) ? true : false,
        sunday: (polyActiveDay.sunday > 0 ) ? true : false,
        createdAt: polyActiveDay.createdAt,
        updatedAt: polyActiveDay.updatedAt,
      },
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.editPolyActiveDay = async (req, res) => {
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
        id: req.params.polyId,
        userId: user.id,
      },
    });

    if (!poly) {
      return baseResponse.error(res, 404, 'Poly not found.');
    }

    const polyActiveDay = await PolyActiveDays.findOne({
      where: {
        polyId: {
          [Op.eq]: [req.params.polyId],
        },
      },
    });

    if (!polyActiveDay) {
      return baseResponse.error(res, 404, `Active day for poly with id ${req.params.polyId} is not found.`);
    }

    await PolyActiveDays.update({
      monday: req.body.monday,
      tuesday: req.body.tuesday,
      wednesday: req.body.wednesday,
      thursday: req.body.thursday,
      friday: req.body.friday,
      saturday: req.body.saturday,
      sunday: req.body.sunday,
    }, {
      where: {
        polyId: req.params.polyId,
      },
    });

    return baseResponse.ok(res, {
      message: `Active day for poly with id ${req.params.polyId} has been updated successfully.`,
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.deletePolyActiveDay = async (req, res) => {
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
        id: req.params.polyId,
        userId: user.id,
      },
    });

    if (!poly) {
      return baseResponse.error(res, 404, 'Poly not found.');
    }

    const polyActiveDay = await PolyActiveDays.findOne({
      where: {
        polyId: {
          [Op.eq]: [req.params.polyId],
        },
      },
    });

    if (!polyActiveDay) {
      return baseResponse.error(res, 404, `Active day for poly with id ${req.params.polyId} is not found.`);
    }

    await PolyActiveDays.destroy({
      where: {
        polyId: req.params.polyId,
      },
    });

    return baseResponse.ok(res, {
      message: `Active day for poly with id ${req.params.polyId} has been deleted successfully.`,
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
