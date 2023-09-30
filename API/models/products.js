const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productUuid: {
    type: String,
    required: true,
  },
  categoryUuid: {
    type: String,
    required: true,
  },
  subcategoryUuid: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  vendorUuid: {
    type: String,
  },
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    required: true,
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

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
