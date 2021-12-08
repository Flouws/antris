/* eslint-disable max-len */
require('dotenv').config();
const {baseResponse} = require('../base/index');
const db = require('../database/models');
const User = db.users;
const Poly = db.polys;
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
        'picture',
      ],
      include: {
        model: Poly,
        attributes: [
          'id',
          'name',
          'doctor',
          'capacity',
        ],
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
      ],
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
