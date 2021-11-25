const {baseResponse} = require('../base/index');

const errorHandler = (err, req, res, next) => {
  return baseResponse.error(res, 500, err.message || 'Unknown error');
};

const error = {
  errorHandler: errorHandler,
};

module.exports = error;
