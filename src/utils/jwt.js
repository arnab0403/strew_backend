const jwt = require("jsonwebtoken");
const util = require("util");
const env = require("../config/env");

const signAsync = util.promisify(jwt.sign);
const verifyAsync = util.promisify(jwt.verify);

const signToken = async (payload, options = {}) => {
  return await signAsync(payload, env.JWT_SECRET, options);
};

const verifyToken = async (token) => {
  return await verifyAsync(token, env.JWT_SECRET);
};

module.exports = {
  signToken,
  verifyToken
};
