const express = require("express");
const { protectedRouteMiddleware } = require("../middlewares/auth.middleware");
const { getUser, getUserWishList, addToWishList } = require("../controllers/user.controller");
const { validateRequest } = require("../middlewares/validation.middleware");
const { validateAddToWishlist } = require("../validators/user.validator");

const userRouter = express.Router();

userRouter.use(protectedRouteMiddleware);
userRouter.get("/", getUser);
userRouter.get("/wishlist", getUserWishList);
userRouter.post("/wishlist", validateRequest(validateAddToWishlist), addToWishList);

module.exports = userRouter;
