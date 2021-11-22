require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../database/models');
const User = db.users;
const Role = db.roles;

verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).json({
      error: {
        code: 403,
        message: 'Access denied!. No access token provided.',
      },
    });
  }

  try {
    jwt.verify(token, process.env.APP_KEY);
  } catch (err) {
    return res.status(401).json({
      error: {
        code: 401,
        message: 'Unauthorized.',
      },
    });
  }
  next();
};

isUser = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).json({
      error: {
        code: 403,
        message: 'Access denied!. No access token provided.',
      },
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.APP_KEY);

    const user = await User.findOne({
      where: {
        uuid: decodedToken.uuid,
      },
    });

    const userRole = await Role.findOne({
      where: {
        id: user.roleId,
      },
    });

    if (userRole.name !== 'user') {
      return res.status(403).json({
        error: {
          code: 403,
          message: 'Access denied!. Required user role.',
        },
      });
    }
  } catch (err) {
    return res.status(401).json({
      error: {
        code: 401,
        message: 'Unauthorized.',
      },
    });
  }
  next();
};

isHospital = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).json({
      error: {
        code: 403,
        message: 'Access denied!. No access token provided.',
      },
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.APP_KEY);

    const user = await User.findOne({
      where: {
        uuid: decodedToken.uuid,
      },
    });

    const userRole = await Role.findOne({
      where: {
        id: user.roleId,
      },
    });

    if (userRole.name !== 'hospital') {
      return res.status(403).json({
        error: {
          code: 403,
          message: 'Access denied!. Required user role.',
        },
      });
    }
  } catch (err) {
    return res.status(401).json({
      error: {
        code: 401,
        message: 'Unauthorized.',
      },
    });
  }
  next();
};

const authJwt = {
  verifyToken: verifyToken,
  isUser: isUser,
  isHospital: isHospital,
};

module.exports = authJwt;
