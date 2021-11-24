const {baseResponse} = require('../base/index');

exports.home = (req, res) => {
  return baseResponse.ok(res, {
    message: 'Antris REST API. Copyright © Antris 2021.',
  });
};
