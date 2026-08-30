const express = require("express");
const { passport } = require("../middlewares/auth.middleware");
const {
  signUp,
  login,
  logout,
  resetPassword,
  forgotPassword,
  googleCallback
} = require("../controllers/auth.controller");
const { validateRequest } = require("../middlewares/validation.middleware");
const {
  validateSignUp,
  validateLogin,
  validateForgotPassword,
  validateResetPassword
} = require("../validators/auth.validator");

const authRouter = express.Router();

authRouter.post("/signup", validateRequest(validateSignUp), signUp);
authRouter.post("/login", validateRequest(validateLogin), login);
authRouter.post("/logout", logout);
authRouter.post("/forgetPassword", validateRequest(validateForgotPassword), forgotPassword);
authRouter.post("/resetPassword", validateRequest(validateResetPassword), resetPassword);

// Google OAuth routes
authRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));
authRouter.get("/google/callback", passport.authenticate("google", { session: false }), googleCallback);

module.exports = authRouter;
