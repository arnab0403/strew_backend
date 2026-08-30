function validateSignUp(req) {
  const user = req.body;
  if (!user || !user.email || !user.password || !user.name) {
    return "All fields (name, email, password) are required";
  }
  return null;
}

function validateLogin(req) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return "all fileds are required";
  }
  return null;
}

function validateForgotPassword(req) {
  const { email } = req.body || {};
  if (!email) {
    return "Email is required";
  }
  return null;
}

function validateResetPassword(req) {
  const { email, otp, password } = req.body || {};
  if (!email || !otp || !password) {
    return "Email, OTP, and new password are required";
  }
  return null;
}

module.exports = {
  validateSignUp,
  validateLogin,
  validateForgotPassword,
  validateResetPassword
};
