const nodemailer = require("nodemailer");
const env = require("../config/env");
const UserModel = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/password");
const { signToken } = require("../utils/jwt");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.GOOGLE_APP_USER,
    pass: env.GOOGLE_APP_PASSWORD
  }
});

async function sendOtpEmail(userMail, userName, otp) {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background: #000000; padding: 24px;">
      <div style="max-width: 600px; margin: auto; border-radius: 8px; overflow: hidden; background: #0b0b0b; border: 1px solid rgba(255,255,255,0.04); box-shadow: 0 6px 18px rgba(0,0,0,0.6);">
        <div style="background: #070707; padding: 20px; text-align: center; color: #ffffff; border-bottom: 1px solid rgba(255,255,255,0.03);">
          <h1 style="margin: 0; font-size: 20px; letter-spacing: 0.4px;">
            <span style="color: #e11d48;">Jio</span><span style="color:#ffffff;">-Clone</span>
          </h1>
        </div>
        <div style="padding: 24px; color: #d1d5db; line-height: 1.5; background: linear-gradient(180deg, rgba(255,255,255,0.01), transparent);">
          <p style="font-size: 15px; color: #e5e7eb; margin: 0 0 12px 0;">
            Hello <strong style="color:#ffffff">${userName}</strong>,
          </p>
          <p style="margin: 0 0 18px 0; color:#cbd5e1;">
            Thank you for using <strong style="color:#ffffff">Jio-Clone</strong>. Use the OTP below to verify your account.
          </p>
          <div style="text-align: center; margin: 22px 0;">
            <div style="display: inline-block; padding: 16px 34px; border-radius: 10px; border: 2px dashed #e11d48; background: rgba(225,29,72,0.04); font-size: 26px; font-weight: 700; letter-spacing: 6px; color: #e11d48;">
              ${otp}
            </div>
          </div>
          <p style="font-size: 13px; color: #9ca3af; text-align: center; margin: 8px 0 0 0;">
            This OTP will expire in <strong style="color:#ffffff">10 minutes</strong>. Do not share it with anyone.
          </p>
        </div>
        <div style="background: #070707; text-align: center; padding: 14px; font-size: 13px; color: #9ca3af; border-top: 1px solid rgba(255,255,255,0.02);">
          &copy; 2025 Jio-Clone. All rights reserved.
        </div>
      </div>
    </div>
  `;

  const info = await transporter.sendMail({
    to: userMail,
    subject: "Welcome To Jio-CLONE",
    html: htmlContent
  });
  console.log("Message sent:", info.messageId);
}

async function signUp(userData) {
    const { email, password } = userData;
    const isExist = await UserModel.findOne({ email });

    if (isExist) {
      throw { status: 400, message: "User already exist" };
    }

    const hashedPassword = await hashPassword(password);
    userData.password = hashedPassword;

    const user = await UserModel.create(userData);
    return user;
}

async function login({ email, password }) {
    const user = await UserModel.findOne({ email });

    if (user?.provider === "google") {
      throw { status: 404, message: "Please Use Google Sign in" };
    }

    if (!user) {
      throw { status: 404, message: "Email ID or Password is wrong" };
    }

    const isVerified = await comparePassword(password, user.password);

    if (!isVerified) {
      throw { status: 401, message: "Email ID or Password is Wrong" };
    }

    const token = await signToken({ id: user._id });
    return { token, user };
}

async function forgotPassword(email) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw { status: 404, message: "No user found" };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    await user.save();

    await sendOtpEmail(user.email, user.name, otp);
    return true;
}

async function resetPassword({ email, otp, password }) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw { status: 404, message: "Email ID not found" };
    }

    if (user.otp !== otp) {
      throw { status: 404, message: "Wrong otp" };
    }

    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.otp = undefined;

    await user.save();
    return true;
}

module.exports = { signUp, login, forgotPassword, resetPassword };
