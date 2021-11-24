require('dotenv').config();
const db = require('../database/models');
const User = db.users;
const jwt = require('jsonwebtoken');

exports.getProfile = async (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).json({
      error: {
        code: 403,
        message: 'No access token provided.',
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
      });

      return res.status(200).json({
        success: {
          code: 200,
          data: {
            user: {
              uuid: user.uuid,
              name: user.name,
              email: user.email,
              address: user.address,
              picture: user.picture,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            },
          },
        },
      });
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
};


exports.home = (req, res) => {
  return res.status(200).json({
    success: {
      code: 200,
      data: {
        message: 'User Home',
      },
    },
  });
};
