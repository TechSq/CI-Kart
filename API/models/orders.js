const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderUuid: {
    type: String,
    required: true,
    unique: true,
  },
  customer: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userUuid: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
  },
  orderItems: [
    {
      productUuid: {
        type: String,
      },
      categoryUuid: {
        type: String,
      },
      subcategoryUuid: {
        type: String,
      },
      imageUrl: {
        type: String,
      },
      vendorUuid: {
        type: String,
      },
      productName: {
        type: String,
      },
      description: {
        type: String,
      },
      price: {
        type: Number,
        default: 0,
      },
      quantity: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        default: 0,
      },
    },
  ],
  orderStatus: {
    type: String,
    default: "InCart",
  },
  coupon: { type: Object },
  charges: [
    {
      label: { type: String },
      chargeLabel: { type: String },
      value: { type: Number },
    },
  ],
  subTotal: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  placedAt: {
    type: Date,
    default: Date.now,
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

const Orders = mongoose.model("Orders", orderSchema);

module.exports = Orders;
