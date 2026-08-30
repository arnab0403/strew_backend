const { sendError } = require("../utils/response");

const validateRequest = (validatorFn) => {
  return (req, res, next) => {
    const error = validatorFn(req);
    if (error) {
      return sendError(res, 400, error);
    }
    next();
  };
};

module.exports = {
  validateRequest
};
