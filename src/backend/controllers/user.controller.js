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
const {Op} = require('sequelize/dist');
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
        picture: user.picture,
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
      picture: picture,
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
        userId: user.id,
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
            attributes: {
              exclude: [
                'id',
                'email',
                'password',
                'roleId',
                'isActive',
                'createdAt',
                'updatedAt',
              ],
            },
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
      }],
    });

    if (!queues[0]) {
      return baseResponse.error(res, 404, 'You don\'t have any queue.');
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
        id: req.params.queueId,
        userId: user.id,
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
            attributes: {
              exclude: [
                'id',
                'email',
                'password',
                'roleId',
                'isActive',
                'createdAt',
                'updatedAt',
              ],
            },
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
      }],
    });

    if (!queue) {
      return baseResponse.error(res, 404, `Queue for id [${req.params.queueId}] not found.`);
    }

    return baseResponse.ok(res, {
      queue: queue,
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.addQueue = async (req, res) => {
  const deleteImage = () => {
    if (req.files) {
      if (req.files.picture1) {
        fs.unlinkSync(req.files.picture1[0].path);
      }
      if (req.files.picture2) {
        fs.unlinkSync(req.files.picture2[0].path);
      }
      if (req.files.picture3) {
        fs.unlinkSync(req.files.picture3[0].path);
      }
      if (req.files.picture4) {
        fs.unlinkSync(req.files.picture4[0].path);
      }
      if (req.files.picture5) {
        fs.unlinkSync(req.files.picture5[0].path);
      }
    }
  };

  const token = req.headers['x-access-token'];
  if (!token) {
    deleteImage();
    return baseResponse.error(res, 403, 'No access token provided.');
  }

  const required = [
    'appointmentId',
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
    const user = await User.findOne({
      where: {
        uuid: decodedToken.uuid,
      },
    });

    const appointment = await Appointment.findOne({
      where: {
        id: req.body.appointmentId,
      },
      include: {
        model: Poly,
        include: {
          model: User,
          required: false,
          where: {
            roleId: {
              [Op.eq]: [2],
            },
            isActive: {
              [Op.gte]: [1],
            },
          },
        },
      },
    });

    if (!appointment) {
      deleteImage();
      return baseResponse.error(res, 404, `Appointment with id [${req.body.appointmentId}] is not found.`);
    }

    if (!appointment.poly) {
      deleteImage();
      return baseResponse.error(res, 404, `Poly for appointment id [${appointment.id}] is not found or already deleted.`);
    }

    if (!appointment.poly.user) {
      deleteImage();
      return baseResponse.error(res, 404, `Hospital for appointment id [${appointment.id}] and poly id [${appointment.poly.id}] is not found, not active or already deleted.`);
    }

    const dateToday = new Date().toLocaleDateString('en-CA', {timeZone: process.env.APP_TIMEZONE_STRING});
    const queueHighestToday = await Queue.findOne({
      where: {
        appointmentId: appointment.id,
        date: dateToday,
      },
      order: [
        ['queue', 'DESC'],
      ],
      attributes: [
        'queue',
      ],
    }) || false;

    if (queueHighestToday.queue >= appointment.poly.capacity) {
      deleteImage();
      return baseResponse.error(res, 400, `Appointment with id [${appointment.id}] has reached maximum capacity for today.`);
    }

    const picture1 = (req.files && req.files.picture1 ? req.files.picture1[0].filename : undefined);
    const picture2 = (req.files && req.files.picture2 ? req.files.picture2[0].filename : undefined);
    const picture3 = (req.files && req.files.picture3 ? req.files.picture3[0].filename : undefined);
    const picture4 = (req.files && req.files.picture4 ? req.files.picture4[0].filename : undefined);
    const picture5 = (req.files && req.files.picture5 ? req.files.picture5[0].filename : undefined);

    await Queue.create({
      userId: user.id,
      appointmentId: appointment.id,
      date: dateToday,
      isAssurance: req.body.isAssurance,
      picture1: picture1,
      picture2: picture2,
      picture3: picture3,
      picture4: picture4,
      picture5: picture5,
      queueStatusId: 0,
    });

    return baseResponse.ok(res, {
      message: `Queue has been created successfully, please wait the hospital to verify your request.`,
    });
  } catch (error) {
    deleteImage();
    return baseResponse.error(res, 500, error.message);
  }
};

exports.home = (req, res) => {
  return baseResponse.ok(res, {
    message: 'User Home',
  });
};
