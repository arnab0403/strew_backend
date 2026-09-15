const { createCheckout: createPaymentCheckout, updatePremiumDetails: updatePremiumStatus } = require("../services/payment.service");
const { sendSuccess, sendError } = require("../utils/response");

async function createCheckout(req, res) {
  try {
    const amount = req.body.amount;
    const order = await createPaymentCheckout(amount);
    return res.status(202).json({
      message: "Checkout created",
      order: order
    });
  } catch (error) {
    return sendError(res, 500, "Internal Server Error");
  }
}

async function updatePremiumDetails(req, res) {
  try {
    const { email } = req.body;
    await updatePremiumStatus(email);
    return sendSuccess(res, 200, "User premium status updated");
  } catch (error) {
    if (error.status) {
      return sendError(res, error.status, error.message);
    }
    return sendError(res, 500, "Internal Server Error");
  }
}

module.exports = {
  createCheckout,
  updatePremiumDetails
};
