const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryUuid: {
        type: String,
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    description: {
        type: String,
        required: false,
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

const Categories = mongoose.model('categories', categorySchema);

module.exports = Categories;
