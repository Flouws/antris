require('dotenv').config();
const {baseResponse} = require('../base/index');
const db = require('../database/models');
const User = db.users;
const jwt = require('jsonwebtoken');

exports.getProfile = async (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return baseResponse.error(res, 403, 'No access token provided.');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.APP_KEY);

    try {
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
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error) {
      return baseResponse.error(res, 500, error.message);
    }
  } catch (error) {
    return baseResponse.error(res, 401, error.message);
  }
};


exports.home = (req, res) => {
  return baseResponse.ok(res, {
    message: 'User Home',
  });
};
