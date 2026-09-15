const { getUserProfile, addToWishList: addWishListItem, getUserWishList: fetchUserWishList } = require("../services/user.service");
const { sendSuccess, sendError } = require("../utils/response");

async function getUser(req, res) {
  try {
    const userId = req.userId;
    const user = await getUserProfile(userId);
    return sendSuccess(res, 200, undefined, { user });
  } catch (error) {
    if (error.status) {
      return sendError(res, error.status, error.message);
    }
    console.log(error);
    return sendError(res, 400, "Internal Server Error");
  }
}

async function addToWishList(req, res) {
  try {
    const userId = req.userId;
    await addWishListItem(userId, req.body);
    return sendSuccess(res, 200, "Item added to wishlist");
  } catch (error) {
    if (error.status) {
      return sendError(res, error.status, error.message);
    }
    console.log(error);
    return sendError(res, 400, "Internal Server Error");
  }
}

async function getUserWishList(req, res) {
  try {
    const userId = req.userId;
    const wishList = await fetchUserWishList(userId);

    if (wishList.length === 0) {
      return sendSuccess(res, 200, "No wishlist found", { wishList: [] });
    }

    return sendSuccess(res, 200, "User wishlist", { wishList });
  } catch (error) {
    if (error.status) {
      return sendError(res, error.status, error.message);
    }
    console.log("Error in getUserList: ", error);
    return sendError(res, 400, "Internal Server Error");
  }
}

module.exports = {
  getUser,
  addToWishList,
  getUserWishList
};
