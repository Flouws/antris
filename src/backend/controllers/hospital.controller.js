/* eslint-disable max-len */
require('dotenv').config();
const {baseResponse} = require('../base/index');
const bcrypt = require('bcrypt');
const db = require('../database/models');
const User = db.users;
const Poly = db.polys;
const Appointment = db.appointments;
const Queue = db.queues;
const QueueStatus = db.queueStatuses;
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
        phone: user.phone,
        description: user.description,
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
      phone: req.body.phone,
      description: req.body.description,
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
  const deleteImage = () => {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  };

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
    deleteImage();
    return baseResponse.error(res, 400, error.message);
  }

  try {
    const decodedToken = jwt.decode(token);
    const picture = (req.file ? req.file.filename : undefined);

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
      description: req.body.description,
      picture: picture,
    });

    return baseResponse.ok(res, {
      message: 'Poly created successfully.',
    });
  } catch (error) {
    deleteImage();
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
      attributes: {
        exclude: [
          'userId',
        ],
      },
    });

    if (!poly) {
      return baseResponse.error(res, 404, 'Poly not found.');
    }

    return baseResponse.ok(res, {
      poly: poly,
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
    const picture = (req.file ? req.file.filename : undefined);

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

    if (picture && poly.picture && fs.existsSync(path.join(__dirname, `../public/uploads/polys/pictures/${poly.picture}`))) {
      fs.unlinkSync(path.join(__dirname, `../public/uploads/polys/pictures/${poly.picture}`));
    }

    await Poly.update({
      name: req.body.name,
      doctor: req.body.doctor,
      capacity: req.body.capacity,
      description: req.body.description,
      picture: picture,
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

    if (poly.picture && fs.existsSync(path.join(__dirname, `../public/uploads/polys/pictures/${poly.picture}`))) {
      fs.unlinkSync(path.join(__dirname, `../public/uploads/polys/pictures/${poly.picture}`));
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
        polyId: poly.id,
      },
    });

    if (!appointment) {
      return baseResponse.error(res, 404, `Appointment not found for poly id ${poly.id} and appointment id ${req.params.appointmentId}`);
    }

    const appointments = await Appointment.findAll({
      where: {
        id: {
          [Op.ne]: appointment.id,
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

exports.getAllQueue = async (req, res) => {
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

    const queues = await Queue.findAll({
      where: {
        '$Appointment.Poly.User.id$': user.id,
      },
      attributes: {
        exclude: [
          'userId',
          'appointmentId',
          'queueStatusId',
          'createdAt',
          'updatedAt',
        ],
      },
      include: [{
        model: Appointment,
        required: false,
        attributes: {
          exclude: [
            'polyId',
            'createdAt',
            'updatedAt',
          ],
        },
        include: {
          model: Poly,
          required: false,
          attributes: {
            exclude: [
              'userId',
              'createdAt',
              'updatedAt',
            ],
          },
          include: {
            model: User,
            required: false,
            attributes: [],
          },
        },
      }, {
        model: QueueStatus,
        required: false,
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
          ],
        },
      }, {
        model: User,
        required: false,
        attributes: {
          exclude: [
            'id',
            'email',
            'password',
            'description',
            'roleId',
            'isActive',
            'createdAt',
            'updatedAt',
          ],
        },
      }],
    });

    if (!queues[0]) {
      return baseResponse.error(res, 404, 'You don\'t have any user queue.');
    }

    return baseResponse.ok(res, {
      queues: queues,
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.getTodayQueue = async (req, res) => {
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

    const dateToday = new Date().toLocaleDateString('en-CA', {timeZone: process.env.APP_TIMEZONE_STRING});
    const queues = await Queue.findAll({
      where: {
        '$Appointment.Poly.User.id$': user.id,
        'date': dateToday,
      },
      attributes: {
        exclude: [
          'userId',
          'appointmentId',
          'queueStatusId',
          'createdAt',
          'updatedAt',
        ],
      },
      include: [{
        model: Appointment,
        required: false,
        attributes: {
          exclude: [
            'polyId',
            'createdAt',
            'updatedAt',
          ],
        },
        include: {
          model: Poly,
          required: false,
          attributes: {
            exclude: [
              'userId',
              'createdAt',
              'updatedAt',
            ],
          },
          include: {
            model: User,
            required: false,
            attributes: [],
          },
        },
      }, {
        model: QueueStatus,
        required: false,
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
          ],
        },
      }, {
        model: User,
        required: false,
        attributes: {
          exclude: [
            'id',
            'email',
            'password',
            'description',
            'roleId',
            'isActive',
            'createdAt',
            'updatedAt',
          ],
        },
      }],
    });

    if (!queues[0]) {
      return baseResponse.error(res, 404, `You don\'t have any user queue today [${dateToday}].`);
    }

    return baseResponse.ok(res, {
      queues: queues,
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.getQueue = async (req, res) => {
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

    const queue = await Queue.findOne({
      where: {
        '$Appointment.Poly.User.id$': user.id,
        'id': req.params.queueId,
      },
      attributes: {
        exclude: [
          'userId',
          'appointmentId',
          'queueStatusId',
          'createdAt',
          'updatedAt',
        ],
      },
      include: [{
        model: Appointment,
        required: false,
        attributes: {
          exclude: [
            'polyId',
            'createdAt',
            'updatedAt',
          ],
        },
        include: {
          model: Poly,
          required: false,
          attributes: {
            exclude: [
              'userId',
              'createdAt',
              'updatedAt',
            ],
          },
          include: {
            model: User,
            required: false,
            attributes: [],
          },
        },
      }, {
        model: QueueStatus,
        required: false,
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
          ],
        },
      }, {
        model: User,
        required: false,
        attributes: {
          exclude: [
            'id',
            'email',
            'password',
            'description',
            'roleId',
            'isActive',
            'createdAt',
            'updatedAt',
          ],
        },
      }],
    });

    if (!queue) {
      return baseResponse.error(res, 404, `User queue with id [${req.params.queueId}] is not found.`);
    }

    return baseResponse.ok(res, {
      queue: queue,
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.getByDateQueue = async (req, res) => {
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

    const queues = await Queue.findAll({
      where: {
        '$Appointment.Poly.User.id$': user.id,
        'date': req.params.queueDate,
      },
      attributes: {
        exclude: [
          'userId',
          'appointmentId',
          'queueStatusId',
          'createdAt',
          'updatedAt',
        ],
      },
      include: [{
        model: Appointment,
        required: false,
        attributes: {
          exclude: [
            'polyId',
            'createdAt',
            'updatedAt',
          ],
        },
        include: {
          model: Poly,
          required: false,
          attributes: {
            exclude: [
              'userId',
              'createdAt',
              'updatedAt',
            ],
          },
          include: {
            model: User,
            required: false,
            attributes: [],
          },
        },
      }, {
        model: QueueStatus,
        required: false,
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
          ],
        },
      }, {
        model: User,
        required: false,
        attributes: {
          exclude: [
            'id',
            'email',
            'password',
            'description',
            'roleId',
            'isActive',
            'createdAt',
            'updatedAt',
          ],
        },
      }],
    });

    if (!queues[0]) {
      return baseResponse.error(res, 404, `You don\'t have any user queue at [${req.params.queueDate}].`);
    }

    return baseResponse.ok(res, {
      queues: queues,
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.acceptQueue = async (req, res) => {
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

    const queue = await Queue.findOne({
      where: {
        '$Appointment.Poly.User.id$': user.id,
        'id': req.params.queueId,
      },
      include: [{
        model: Appointment,
        required: false,
        include: {
          model: Poly,
          required: false,
          include: {
            model: User,
            required: false,
          },
        },
      }, {
        model: QueueStatus,
        required: false,
      }, {
        model: User,
        required: false,
      }],
    });

    if (!queue) {
      return baseResponse.error(res, 404, `User queue with id [${req.params.queueId}] is not found.`);
    }

    if (!queue.appointment) {
      return baseResponse.error(res, 404, `Appointment for user queue with id [${queue.id}] is not found or already deleted.`);
    }

    if (!queue.appointment.poly) {
      return baseResponse.error(res, 404, `Poly for user queue with id [${queue.id}] and appointment id [${queue.appointment.id}] is not found or already deleted.`);
    }

    if (queue.queueStatusId !== 0) {
      return baseResponse.error(res, 404, `Cannot accept user queue because queue status with id [${queue.id}] is [(${queue.queueStatus.id})-${queue.queueStatus.name}].`);
    }

    const dateToday = new Date().toLocaleDateString('en-CA', {timeZone: process.env.APP_TIMEZONE_STRING});
    const queueHighestToday = await Queue.findOne({
      where: {
        '$Appointment.Poly.User.id$': user.id,
        'date': dateToday,
        'appointmentId': queue.appointmentId,
      },
      include: [{
        model: Appointment,
        required: false,
        include: {
          model: Poly,
          required: false,
          include: {
            model: User,
            required: false,
          },
        },
      }],
      order: [
        ['queue', 'DESC'],
      ],
      attributes: [
        'queue',
      ],
    }) || false;

    if (queueHighestToday.queue >= queue.appointment.poly.capacity) {
      return baseResponse.error(res, 400, `Cannot accept queue because appointment with id [${queue.appointment.id}] has reached maximum capacity for today.`);
    }

    await Queue.update({
      queue: queueHighestToday.queue+1,
      queueStatusId: 1,
    }, {
      where: {
        id: queue.id,
      },
    });

    return baseResponse.ok(res, {
      message: `Queue with id [${queue.id}] has been accepted successfully.`,
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.processQueue = async (req, res) => {
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

    const queue = await Queue.findOne({
      where: {
        '$Appointment.Poly.User.id$': user.id,
        'id': req.params.queueId,
      },
      include: [{
        model: Appointment,
        required: false,
        include: {
          model: Poly,
          required: false,
          include: {
            model: User,
            required: false,
          },
        },
      }, {
        model: QueueStatus,
        required: false,
      }, {
        model: User,
        required: false,
      }],
    });

    if (!queue) {
      return baseResponse.error(res, 404, `User queue with id [${req.params.queueId}] is not found.`);
    }

    if (!queue.appointment) {
      return baseResponse.error(res, 404, `Appointment for user queue with id [${queue.id}] is not found or already deleted.`);
    }

    if (!queue.appointment.poly) {
      return baseResponse.error(res, 404, `Poly for user queue with id [${queue.id}] and appointment id [${queue.appointment.id}] is not found or already deleted.`);
    }

    if (queue.queueStatusId !== 1) {
      return baseResponse.error(res, 404, `Cannot process user queue because queue status with id [${queue.id}] is [(${queue.queueStatus.id})-${queue.queueStatus.name}].`);
    }

    await Queue.update({
      queueStatusId: 2,
    }, {
      where: {
        id: queue.id,
      },
    });

    return baseResponse.ok(res, {
      message: `Queue with id [${queue.id}] has been processed successfully.`,
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
