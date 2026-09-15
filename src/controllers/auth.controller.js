const { signUp: signUpUser, login: loginUser, forgotPassword: sendPasswordOtp, resetPassword: resetUserPassword } = require("../services/auth.service");
const { sendSuccess, sendError } = require("../utils/response");
const { signToken } = require("../utils/jwt");
const env = require("../config/env");

const signUp = async (req, res, next) => {
  try {
    const userRes = await signUpUser(req.body);
    return sendSuccess(res, 202, "User created sucsessfully", { user: userRes });
  } catch (error) {
    if (error.status) {
      return sendError(res, error.status, error.message);
    }
    console.log(error.message);
    return sendError(res, 500, "Internal Server Error");
  }
};

const login = async (req, res, next) => {
  try {
    const { token, user } = await loginUser(req.body);

    res.cookie("jwt", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    return sendSuccess(res, 200, "user sucsessfully logged in", { user });
  } catch (error) {
    if (error.status) {
      return sendError(res, error.status, error.message);
    }
    console.log(error);
    return sendError(res, 500, "Internal Server Error");
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    return sendSuccess(res, 200, "Logged out successfully");
  } catch (error) {
    console.log(error);
    return sendError(res, 500, "Internal Server Error");
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await sendPasswordOtp(email);
    return sendSuccess(res, 200, "OTP sent");
  } catch (error) {
    if (error.status) {
      return sendError(res, error.status, error.message);
    }
    console.log("Error in forgotPassword:", error);
    return sendError(res, 500, "Internal Server Error");
  }
};

const resetPassword = async (req, res) => {
  try {
    await resetUserPassword(req.body);
    return sendSuccess(res, 200, "otp confirmed, user verified");
  } catch (error) {
    if (error.status) {
      return sendError(res, error.status, error.message);
    }
    console.log(error);
    return sendError(res, 500, "Internal Server Error");
  }
};

const googleCallback = async (req, res) => {
  try {
    const user = req.user;
    const FRONT_END_URL = env.FRONTEND_URL;

    if (user.provider === "jio") {
      return res.redirect(`${FRONT_END_URL}/login?error=manual_account`);
    }

    const jwtToken = await signToken({ id: user._id }, { expiresIn: "7d" });

    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/"
    });

    console.log("Cookie Updated");
    res.redirect(`${FRONT_END_URL}/`);
  } catch (error) {
    console.log(error);
    const FRONT_END_URL = env.FRONTEND_URL;
    res.redirect(`${FRONT_END_URL}/login?error=google_failed`);
  }
};

module.exports = {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  googleCallback
};
