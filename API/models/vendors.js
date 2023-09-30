const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    vendorUuid: {
        type: String,
        required: true,
    },
    ownerUuid: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        default: 'Vendor'
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
    },
    password: {
        type: String,
    },
    status: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    AADHARNumber: {
        type: String,
        // unique: true,
    },
    PANNumber: {
        type: String,
        // unique: true,
    },
    gstn: {
        type: String,
        // unique: true,
    },
    otp: {
        type: String,
    },
    bankName: {
        type: String,
        // required: true,
    },
    bankAccountNumber: {
        type: String,
        // required: true,
        // unique: true,
    },
    IFSCCode: {
        type: String,
        // required: true,
    },
    legalName: {
        type: String,
        // required: true,
    },
    address1: {
        type: String,
        // required: true,
    },
    address2: {
        type: String,
        // required: true,
    },
    panCardUrl: {
        type: String,
        // required: true,
    },
    aadharCardurl: {
        type: String,
        // required: true,
    },
    gstNumberUrl: {
        type: String,
        // required: true,
    },
    logoUrl: {
        type: String,
        // required: true,
    },
    personalPanCardUrl: {
        type: String,
        // required: true,
    },
    udhyogAadharUrl: {
        type: String,
        // required: true,
    },
    cinUrl: {
        type: String,
        // required: true,
    },
    fssaiUrl: {
        type: String,
        // required: true,
    },
    city: {
        type: String,
        // required: true,
    },
    district: {
        type: String,
        // required: true,
    },
    state: {
        type: String,
        // required: true,
    },
    pincode: {
        type: String,
        // required: true,
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

const User = mongoose.model('Vendor', vendorSchema);

module.exports = User;
