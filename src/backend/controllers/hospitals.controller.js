/* eslint-disable max-len */
require('dotenv').config();
const {baseResponse} = require('../base/index');
const db = require('../database/models');
const User = db.users;
const Poly = db.polys;
const Appointments = db.appointments;
const {Op} = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        roleId: {
          [Op.eq]: [2],
        },
        isActive: {
          [Op.gte]: [1],
        },
      },
      attributes: [
        'uuid',
        'name',
        'address',
        'phone',
        'description',
        'picture',
      ],
    });

    return baseResponse.ok(res, {
      hospitals: user,
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.params.uuid,
        roleId: {
          [Op.eq]: [2],
        },
        isActive: {
          [Op.gte]: [1],
        },
      },
      attributes: [
        'uuid',
        'name',
        'address',
        'phone',
        'description',
        'picture',
      ],
      include: {
        model: Poly,
        attributes: [
          'id',
          'name',
          'doctor',
          'capacity',
          'description',
          'picture',
        ],
        include: {
          model: Appointments,
          attributes: [
            'id',
            'day',
            'timeStart',
            'timeEnd',
          ],
        },
      },
    });

    if (!user) {
      return baseResponse.error(res, 404, 'Hospital not found.');
    }

    return baseResponse.ok(res, {
      hospital: user,
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.getAllPoly = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.params.uuid,
        roleId: {
          [Op.eq]: [2],
        },
        isActive: {
          [Op.gte]: [1],
        },
      },
    });

    if (!user) {
      return baseResponse.error(res, 404, 'Hospital not found.');
    }

    const polys = await Poly.findAll({
      where: {
        userId: user.id,
      },
      attributes: [
        'id',
        'name',
        'doctor',
        'capacity',
        'description',
        'picture',
      ],
      include: {
        model: Appointments,
        attributes: [
          'id',
          'day',
          'timeStart',
          'timeEnd',
        ],
      },
    });

    if (!polys[0]) {
      return baseResponse.error(res, 404, `Hospital with uuid '${user.uuid}' has no any poly.`);
    }

    return baseResponse.ok(res, {
      polys: polys,
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.getOnePoly = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.params.uuid,
        roleId: {
          [Op.eq]: [2],
        },
        isActive: {
          [Op.gte]: [1],
        },
      },
    });

    if (!user) {
      return baseResponse.error(res, 404, 'Hospital not found.');
    }

    const poly = await Poly.findOne({
      where: {
        id: req.params.polyId,
        userId: user.id,
      },
      attributes: [
        'id',
        'name',
        'doctor',
        'capacity',
        'description',
        'picture',
      ],
      include: {
        model: Appointments,
        attributes: [
          'id',
          'day',
          'timeStart',
          'timeEnd',
        ],
      },
    });

    if (!poly) {
      return baseResponse.error(res, 404, `Poly not found for hospital uuid '${user.uuid}' and poly id '${req.params.polyId}'.`);
    }

    return baseResponse.ok(res, {
      poly: poly,
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.getAllAppointment = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.params.uuid,
        roleId: {
          [Op.eq]: [2],
        },
        isActive: {
          [Op.gte]: [1],
        },
      },
    });

    if (!user) {
      return baseResponse.error(res, 404, 'Hospital not found.');
    }

    const poly = await Poly.findOne({
      where: {
        id: req.params.polyId,
        userId: user.id,
      },
    });

    if (!poly) {
      return baseResponse.error(res, 404, `Poly not found for hospital uuid '${user.uuid}' and poly id '${req.params.polyId}'.`);
    }

    const appointments = await Appointments.findAll({
      where: {
        polyId: poly.id,
      },
      attributes: [
        'id',
        'day',
        'timeStart',
        'timeEnd',
      ],
    });

    if (!appointments[0]) {
      return baseResponse.error(res, 404, `Poly for hospital uuid '${user.uuid}' and poly id '${poly.id}' has no any appointment.`);
    }

    return baseResponse.ok(res, {
      appointments: appointments,
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};

exports.getOneAppointment = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.params.uuid,
        roleId: {
          [Op.eq]: [2],
        },
        isActive: {
          [Op.gte]: [1],
        },
      },
    });

    if (!user) {
      return baseResponse.error(res, 404, 'Hospital not found.');
    }

    const poly = await Poly.findOne({
      where: {
        id: req.params.polyId,
        userId: user.id,
      },
    });

    if (!poly) {
      return baseResponse.error(res, 404, `Poly not found for hospital uuid '${user.uuid}' and poly id '${req.params.polyId}'.`);
    }

    const appointment = await Appointments.findOne({
      where: {
        id: req.params.appointmentId,
        polyId: poly.id,
      },
      attributes: [
        'id',
        'day',
        'timeStart',
        'timeEnd',
      ],
    });

    if (!appointment) {
      return baseResponse.error(res, 404, `Appointment not found for hospital uuid '${user.uuid}', poly id '${poly.id}' and appointment id '${req.params.appointmentId}'.`);
    }

    return baseResponse.ok(res, {
      appointment: appointment,
    });
  } catch (error) {
    return baseResponse.error(res, 500, error.message);
  }
};
