exports.ok = (res, data) => {
  return res.status(200).json({
    success: {
      code: 200,
      data: data,
    },
  });
};

exports.error = (res, code, error) => {
  return res.status(code).json({
    error: {
      code: code,
      message: error,
    },
  });
};
