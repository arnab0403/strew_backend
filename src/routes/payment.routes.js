const express = require("express");
const { createCheckout, updatePremiumDetails } = require("../controllers/payment.controller");

const paymentRouter = express.Router();

paymentRouter.post("/order", createCheckout);
paymentRouter.post("/update-premium-access", updatePremiumDetails);

module.exports = paymentRouter;
