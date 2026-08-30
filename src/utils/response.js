const sendSuccess = (res, statusCode, message, payload = {}) => {
  return res.status(statusCode).json({
    message,
    status: "success",
    ...payload
  });
};

const sendError = (res, statusCode, message, payload = {}) => {
  return res.status(statusCode).json({
    message,
    status: "failed",
    ...payload
  });
};

module.exports = {
  sendSuccess,
  sendError
};
