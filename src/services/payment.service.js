const Razorpay = require("razorpay");
const ShortId = require("short-unique-id");
const env = require("../config/env");
const UserModel = require("../models/user.model");

const instance = new Razorpay({
  key_id: env.RAZORPAY_PUBLIC_KEY,
  key_secret: env.RAZORPAY_PRIVATE_KEY
});

class PaymentService {
  static async createCheckout(amount) {
    const currency = "INR";
    const uid = new ShortId({ length: 10 });
    const orderConfig = {
      amount: amount * 100,
      currency: currency,
      receipt: uid.rnd()
    };

    const order = await instance.orders.create(orderConfig);
    return order;
  }

  static async updatePremiumDetails(email) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    user.isPremium = true;
    await user.save();
    return true;
  }
}

module.exports = PaymentService;
