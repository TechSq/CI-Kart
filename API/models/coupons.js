const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  couponName: {
    type: String,
    required: true,
  },
  discountType: {
    type: String,
    required: true,
  },
  discountValue: {
    type: Number,
    required: true,
  },
  couponCode: {
    type: String,
    required: true,
    unique: true,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Coupons = mongoose.model("Coupons", couponSchema);

module.exports = Coupons;
