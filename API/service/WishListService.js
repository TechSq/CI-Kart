const { default: mongoose } = require("mongoose");
const { Orders, Products, WishList } = require("../models");
const { OrderStatus } = require("../shared/constant-values");

async function addToWishList(customerId, productUuid) {
  const product = await Products.findOne({
    productUuid: productUuid,
  });

  if (!product || product.isActive === false) {
    return {
      message: "Product not found or not active",
      success: false,
      data: {},
    };
  }

  // Save the updated order
  await WishList.findOneAndUpdate(
    {
      customer: customerId,
      wishListItems: { $not: { $elemMatch: { $eq: product._id } } },
    },
    { $push: { wishListItems: product._id } }
  );

  const wishlist = await WishList.findOne({
    customer: customerId,
  }).populate("wishListItems");

  if (!wishlist) {
    const newWishList = new WishList();
    newWishList.customer = customerId;
    newWishList.wishListItems = [product._id];
    await newWishList.save();

    const wishlist = await WishList.findOne({
      customer: customerId,
    }).populate("wishListItems");
    const dbData = wishlist?.wishListItems || [];

    let resData = [];
    if (dbData && dbData.length > 0) {
      resData = dbData;
    }
    resData = resData.map((a, index) => {
      return {
        ...a._doc,
        sno: index + 1,
      };
    });
    return {
      message: "Wishlist updated successfully",
      success: true,
      data: resData,
    };
  }

  const dbData = wishlist?.wishListItems || [];

  let resData = [];
  if (dbData && dbData.length > 0) {
    resData = dbData;
  }
  resData = resData.map((a, index) => {
    return {
      ...a._doc,
      sno: index + 1,
    };
  });

  return {
    message: "Wishlist updated successfully",
    success: true,
    data: resData,
  };
}

async function removeFromWishList(customerId, productUuid) {
  const product = await Products.findOne({
    productUuid: productUuid,
  });
  await WishList.findOneAndUpdate(
    {
      customer: customerId,
      wishListItems: { $elemMatch: { $eq: product._id } },
    },
    { $pull: { wishListItems: product._id } }
  );

  const wishlist = await WishList.findOne({
    customer: customerId,
  }).populate("wishListItems");

  return {
    message: "Product removed from wishlist successfully",
    success: true,
    data: wishlist?.wishListItems || [],
  };
}

module.exports = { addToWishList, removeFromWishList };
