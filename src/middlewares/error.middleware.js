const { sendError } = require("../utils/response");

function errorMiddleware(err, req, res, next) {
  console.error("Unhandled Error:", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return sendError(res, statusCode, message);
}

module.exports = errorMiddleware;
