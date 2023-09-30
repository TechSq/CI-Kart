const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryUuid: {
        type: String,
        required: true,
    },
    subcategoryUuid: {
        type: String,
        required: true,
    },
    subcategoryName: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    gender: {
        type: String,
    },
    description: {
        type: String,
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
        ref: 'User',
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const SubCategories = mongoose.model('sub_categories', categorySchema);

module.exports = SubCategories;
