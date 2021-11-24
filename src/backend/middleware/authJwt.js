/* eslint-disable max-len */
require('dotenv').config();
const {baseResponse} = require('../base/index');
const jwt = require('jsonwebtoken');
const db = require('../database/models');
const User = db.users;
const Role = db.roles;

verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return baseResponse.error(res, 403, 'Access denied!. No access token provided.');
  }

  try {
    jwt.verify(token, process.env.APP_KEY);
  } catch (error) {
    return baseResponse.error(res, 401, error.message);
  }
  next();
};

isUser = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return baseResponse.error(res, 403, 'Access denied!. No access token provided.');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.APP_KEY);

    try {
      const user = await User.findOne({
        where: {
          uuid: decodedToken.uuid,
        },
        include: Role,
      });

      if (user.role.name !== 'user') {
        return baseResponse.error(res, 403, 'Access denied!. Required user role.');
      }
    } catch (error) {
      return baseResponse.error(res, 500, error.message);
    }
  } catch (error) {
    return baseResponse.error(res, 401, error.message);
  }
  next();
};

isHospital = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return baseResponse.error(res, 403, 'Access denied!. No access token provided.');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.APP_KEY);

    try {
      const user = await User.findOne({
        where: {
          uuid: decodedToken.uuid,
        },
        include: Role,
      });

      if (user.role.name !== 'hospital') {
        return baseResponse.error(res, 403, 'Access denied!. Required user role.');
      }
    } catch (error) {
      return baseResponse.error(res, 500, error.message);
    }
  } catch (error) {
    return baseResponse.error(res, 401, error.message);
  }
  next();
};

const authJwt = {
  verifyToken: verifyToken,
  isUser: isUser,
  isHospital: isHospital,
};

module.exports = authJwt;
