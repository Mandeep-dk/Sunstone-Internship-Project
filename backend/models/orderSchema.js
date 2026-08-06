const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  buyerUid: String,
  sellerUid: String,
  amount: Number,
  paymentId: String,
  status: {
    type: String,
    default: "paid",
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);