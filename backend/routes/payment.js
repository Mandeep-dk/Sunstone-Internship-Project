const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/create-order', async (req, res) => {
  try {
    console.log('BODY:', req.body);

    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: 'Amount is required',
      });
    }

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    console.log('ORDER:', order);

    res.json({
      success: true,
      order,
    });
  } catch (err) {
    console.error('RAZORPAY ERROR:', err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.post("/verify-payment", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    return res.json({ success: true, message: "Payment verified" });
  }

  res.status(400).json({ success: false, message: "Invalid signature" });
});

module.exports = router;