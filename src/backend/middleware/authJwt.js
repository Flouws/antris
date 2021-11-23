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
  } catch (error) {
    return res.status(401).json({
      error: {
        code: 401,
        message: error.message,
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

    try {
      const user = await User.findOne({
        where: {
          uuid: decodedToken.uuid,
        },
        include: Role,
      });

      if (user.role.name !== 'user') {
        return res.status(403).json({
          error: {
            code: 403,
            message: 'Access denied!. Required user role.',
          },
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: {
          code: 500,
          message: error.message,
        },
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: {
        code: 401,
        message: error.message,
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

    try {
      const user = await User.findOne({
        where: {
          uuid: decodedToken.uuid,
        },
        include: Role,
      });

      if (user.role.name !== 'hospital') {
        return res.status(403).json({
          error: {
            code: 403,
            message: 'Access denied!. Required user role.',
          },
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: {
          code: 500,
          message: error.message,
        },
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: {
        code: 401,
        message: error.message,
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
