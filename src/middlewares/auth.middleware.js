const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const env = require("../config/env");
const UserModel = require("../models/user.model");
const { verifyToken } = require("../utils/jwt");
const { sendError } = require("../utils/response");

// Configure Passport Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID || "dummy_id",
      clientSecret: env.GOOGLE_CLIENT_SECRET || "dummy_secret",
      callbackURL: env.GOOGLE_CALLBACK_URL
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        let user = await UserModel.findOne({ email: profile.emails[0].value });

        if (!user) {
          const newUser = {
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            avatar: profile.photos[0].value,
            provider: "google"
          };
          user = await UserModel.create(newUser);
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

async function protectedRouteMiddleware(req, res, next) {
  try {
    if (req.cookies && req.cookies.jwt) {
      const jwtToken = req.cookies.jwt;
      const decoded = await verifyToken(jwtToken);
      req.userId = decoded.id;
      next();
    } else {
      console.log("No Cookies here");
      return sendError(res, 400, "No Cookies Found");
    }
  } catch (error) {
    console.log(error);
    return sendError(res, 500, "Internal Server Error");
  }
}

module.exports = {
  protectedRouteMiddleware,
  passport
};
