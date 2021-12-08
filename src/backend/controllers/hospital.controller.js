/* eslint-disable max-len */
require('dotenv').config();
const {baseResponse} = require('../base/index');
const bcrypt = require('bcrypt');
const db = require('../database/models');
const User = db.users;
const Poly = db.polys;
const Appointment = db.appointments;
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

exports.addAppointment = async (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return baseResponse.error(res, 403, 'No access token provided.');
  }

  const required = [
    'day',
    'timeStart',
    'timeEnd',
  ];
  try {
    required.forEach((requiredItem) => {
      if (!req.body[requiredItem]) {
        throw new Error(`Should contain ${requiredItem}`);
      }
    });
    if (req.body.day < 1 || req.body.day > 7) {
      throw new Error('Field \'day\' must contain a value between 1 - 7.');
    }
    if (req.body.timeStart > req.body.timeEnd) {
      throw new Error('\'timeStart\' must be not greater than \'timeEnd\'');
    }
    if (req.body.timeStart === req.body.timeEnd) {
      throw new Error('\'timeStart\' must be not equals than \'timeEnd\'');
    }
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

    const poly = await Poly.findOne({
      where: {
        id: req.params.polyId,
        userId: user.id,
      },
    });

    if (!poly) {
      return baseResponse.error(res, 404, 'Poly not found.');
    }

    const appointments = await Appointment.findAll({
      where: {
        polyId: poly.id,
        day: req.body.day,
        timeStart: {
          [Op.lte]: [req.body.timeEnd],
        },
        timeEnd: {
          [Op.gte]: [req.body.timeStart],
        },
      },
    });
    if (appointments[0]) {
      return baseResponse.error(res, 404, `There is a time conflict with appointment id ${appointments[0].id}`);
    }

    await Appointment.create({
      polyId: poly.id,
      day: req.body.day,
      timeStart: req.body.timeStart,
      timeEnd: req.body.timeEnd,
    });

    return baseResponse.ok(res, {
      message: `Appointment for poly with id ${poly.id} has been created successfully.`,
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.getAllAppointment = async (req, res) => {
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

    const appointments = await Appointment.findAll({
      where: {
        polyId: {
          [Op.eq]: [poly.id],
        },
      },
    });

    if (!appointments[0]) {
      return baseResponse.error(res, 404, `Poly with id ${poly.id} is not have any appointment.`);
    }

    return baseResponse.ok(res, {
      appointments: appointments,
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.getAppointment = async (req, res) => {
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

    const appointment = await Appointment.findOne({
      where: {
        id: {
          [Op.eq]: [req.params.appointmentId],
        },
        polyId: {
          [Op.eq]: [poly.id],
        },
      },
    });

    if (!appointment) {
      return baseResponse.error(res, 404, `Appointment not found for poly id ${poly.id} and appointment id ${req.params.appointmentId}`);
    }

    return baseResponse.ok(res, {
      appointment: appointment,
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.editAppointment = async (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return baseResponse.error(res, 403, 'No access token provided.');
  }

  const required = [
    'timeStart',
    'timeEnd',
  ];
  try {
    required.forEach((requiredItem) => {
      if (!req.body[requiredItem]) {
        throw new Error(`Should contain ${requiredItem}`);
      }
    });
    if (req.body.day && req.body.day < 1 || req.body.day > 7) {
      throw new Error('Field \'day\' must contain a value between 1 - 7.');
    }
    if (req.body.timeStart > req.body.timeEnd) {
      throw new Error('\'timeStart\' must be not greater than \'timeEnd\'');
    }
    if (req.body.timeStart === req.body.timeEnd) {
      throw new Error('\'timeStart\' must be not equals than \'timeEnd\'');
    }
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

    const poly = await Poly.findOne({
      where: {
        id: req.params.polyId,
        userId: user.id,
      },
    });

    if (!poly) {
      return baseResponse.error(res, 404, 'Poly not found.');
    }

    const appointment = await Appointment.findOne({
      where: {
        id: req.params.appointmentId,
      },
    });

    if (!appointment) {
      return baseResponse.error(res, 404, `Appointment not found for poly id ${poly.id} and appointment id ${req.params.appointmentId}`);
    }

    const appointments = await Appointment.findAll({
      where: {
        id: {
          [Op.ne]: req.params.appointmentId,
        },
        polyId: poly.id,
        day: (req.body.day ? req.body.day : appointment.day),
        timeStart: {
          [Op.lte]: [req.body.timeEnd],
        },
        timeEnd: {
          [Op.gte]: [req.body.timeStart],
        },
      },
    });
    if (appointments[0]) {
      return baseResponse.error(res, 404, `There is a time conflict with appointment id ${appointments[0].id}`);
    }

    await Appointment.update({
      day: req.body.day,
      timeStart: req.body.timeStart,
      timeEnd: req.body.timeEnd,
    }, {
      where: {
        id: req.params.appointmentId,
      },
    });

    return baseResponse.ok(res, {
      message: `Appointment for poly with id ${poly.id} has been updated successfully.`,
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.deleteAppointment = async (req, res) => {
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

    const appointment = await Appointment.findOne({
      where: {
        id: req.params.appointmentId,
        polyId: poly.id,
      },
    });

    if (!appointment) {
      return baseResponse.error(res, 404, `Appointment not found for poly id ${poly.id} and appointment id ${req.params.appointmentId}`);
    }

    await Appointment.destroy({
      where: {
        id: req.params.appointmentId,
        polyId: poly.id,
      },
    });

    return baseResponse.ok(res, {
      message: `Appointment for poly id ${poly.id} and appointment id ${appointment.id} has been deleted successfully.`,
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
