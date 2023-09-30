const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
  attributeName: {
    type: String,
    required: true,
    unique: true,
  },
  isSingle: { type: Boolean, default: true },
  attributeValues: [
    {
      attributeValue: { type: String, unique: true },
      additionalValue: { type: String },
    },
  ],
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

const Attributes = mongoose.model("Attributes", attributeSchema);

module.exports = Attributes;
