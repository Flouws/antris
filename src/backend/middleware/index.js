const verifySignUp = require('./verifySignUp');
const authJwt = require('./authJwt');
const upload = require('./upload');
const error = require('./error');

module.exports = {
  verifySignUp,
  authJwt,
  upload,
  error,
};
