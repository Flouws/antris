exports.home = (req, res) => {
  res.status(200).json({
    success: {
      code: 200,
      data: {
        message: 'Antris REST API. Copyright © Antris 2021.',
      },
    },
  });
};
