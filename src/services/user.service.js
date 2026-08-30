const UserModel = require("../models/user.model");
const TMDBService = require("./tmdb.service");

class UserService {
  static async getUserProfile(userId) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw { status: 404, message: "User not found" };
    }
    const { name, email, wishList, isPremium, avatar } = user;
    return { name, email, avatar, wishList, isPremium };
  }

  static async addToWishList(userId, { id, media_type }) {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw { status: 404, message: "No user found" };
    }

    if (user.wishList.find((item) => item.id === id)) {
      throw { status: 400, message: "Already Exist in Your Watchlist" };
    }

    let postItem;
    if (media_type === "tv") {
      postItem = await TMDBService.fetch(TMDBService.ENDPOINTS.fetchTvShowDetails(id));
    } else {
      postItem = await TMDBService.fetch(TMDBService.ENDPOINTS.fetchMovieDetails(id));
    }

    const wishListItem = {
      poster_path: postItem.poster_path,
      name: postItem.name || postItem.title,
      id: postItem.id,
      media_type: media_type
    };

    user.wishList.push(wishListItem);
    await user.save();
    return wishListItem;
  }

  static async getUserWishList(userId) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw { status: 404, message: "User not found" };
    }
    return user.wishList || [];
  }
}

module.exports = UserService;
