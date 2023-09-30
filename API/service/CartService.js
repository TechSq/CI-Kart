const { Orders, Products, Coupons } = require("../models");
const { OrderStatus } = require("../shared/constant-values");

async function addItemToCart(orderUuid, productUuid, quantity) {
  const order = await Orders.findOne({ orderUuid });
  const product = await Products.findOne({ productUuid });

  if (!order || order?.orderStatus !== OrderStatus.InCart) {
    return {
      message: "Order not found for cart",
      success: false,
      data: {},
    };
  }

  const existingItemIndex = order.orderItems.findIndex(
    (item) => item.productUuid === productUuid
  );

  if (existingItemIndex !== -1) {
    // Update quantity and total of the existing item
    const existingItem = order.orderItems[existingItemIndex];
    existingItem.quantity = quantity;
    existingItem.total = parseFloat(
      (existingItem.price * existingItem.quantity).toFixed(2)
    );
  } else {
    // Create a new item and add it to the order's orderItems array
    const newItem = {
      productUuid: productUuid,
      categoryUuid: product.categoryUuid,
      subcategoryUuid: product.subcategoryUuid,
      imageUrl: product.imageUrl,
      vendorUuid: product.vendorUuid,
      productName: product.productName,
      description: product.description,
      price: product.price,
      quantity: quantity,
      total: parseFloat((product.price * quantity).toFixed(2)),
    };
    order.orderItems.push(newItem);
  }

  // Save the updated order
  await order.save();

  const updatedTally = await tally(order);

  const updatedFields = {
    total: updatedTally.total,
    subTotal: updatedTally.subTotal,
    charges: updatedTally.charges,
  };

  // Save the updated order
  await Orders.findOneAndUpdate({ _id: order._id }, { $set: updatedFields });

  const orderAfterCoupon = await Orders.findOne({ orderUuid });

  return {
    message: "Added successfully",
    success: true,
    data: orderAfterCoupon,
  };
}

async function removeItemFromCart(orderUuid, productUuid) {
  const order = await Orders.findOne({ orderUuid });
  const product = await Products.findOne({ productUuid });

  if (!order || order?.orderStatus !== OrderStatus.InCart) {
    return {
      message: "Order not found for cart",
      success: false,
      data: {},
    };
  }

  const existingItemIndex = order.orderItems.findIndex(
    (item) => item.productUuid === productUuid
  );

  if (existingItemIndex !== -1) {
    // Remove the item from the order's orderItems array
    order.orderItems.splice(existingItemIndex, 1);
  } else {
    return {
      message: "Item not found in the cart",
      success: false,
      data: {},
    };
  }

  // Save the updated order
  await order.save();

  const updatedTally = await tally(order);

  const updatedFields = {
    total: updatedTally.total,
    subTotal: updatedTally.subTotal,
    charges: updatedTally.charges,
  };

  // Save the updated order
  await Orders.findOneAndUpdate({ _id: order._id }, { $set: updatedFields });

  const orderAfterCoupon = await Orders.findOne({ orderUuid });

  return {
    message: "Added successfully",
    success: true,
    data: orderAfterCoupon,
  };
}

async function tally(existingOrder) {
  let order = { total: 0, subTotal: 0, charges: [] };
  const total = existingOrder?.orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  order.total = parseFloat(total.toFixed(2));

  order.subTotal = parseFloat(total.toFixed(2));

  if (existingOrder?.charges != undefined) {
    order.charges = existingOrder.charges;
  }

  if (existingOrder?.coupon) {
    let discount = 0;
    if (existingOrder.coupon.discountType === "Percentage") {
      discount = (total / 100) * existingOrder.coupon.discountValue;
    } else if (existingOrder.coupon.discountType === "Amount") {
      discount = existingOrder.coupon.discountValue;
    }
    order.total = parseFloat((total - discount).toFixed(2)) || 0;

    if (discount > 0) {
      const existingChargesIndex = order.charges.findIndex(
        (item) => item.label === "Coupon Discount"
      );
      if (existingChargesIndex !== -1) {
        // Update quantity and total of the existing item
        const existingItem = order.charges[existingChargesIndex];
        existingItem.chargeLabel = `(${existingOrder.coupon.discountValue}${
          existingOrder.coupon.discountType === "Percentage" ? "%" : " Rs"
        })`;
        existingItem.value =
          existingOrder.coupon.discountType === "Percentage"
            ? parseFloat(discount.toFixed(2)) || 0
            : discount;
      } else {
        const newItem = {
          label: "Coupon Discount",
          chargeLabel: `(${existingOrder.coupon.discountValue}${
            existingOrder.coupon.discountType === "Percentage" ? "%" : " Rs"
          })`,
          value:
            existingOrder.coupon.discountType === "Percentage"
              ? parseFloat(discount.toFixed(2)) || 0
              : discount,
        };
        order.charges.push(newItem);
      }
    }
  }

  return order;
}

async function applySelectedCoupon(orderUuid, coupon) {
  const order = await Orders.findOne({ orderUuid });

  if (!order || order?.orderStatus !== OrderStatus.InCart) {
    return {
      message: "Order not found for cart",
      success: false,
      data: {},
    };
  }

  if (order.coupon !== undefined) {
    return {
      message: "Only one Coupon can be applied for this order",
      success: false,
      data: {},
    };
  }

  order.coupon = {
    couponName: coupon.couponName,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    couponCode: coupon.couponCode,
  };

  await order.save();

  await Coupons.findOneAndUpdate({ _id: coupon._id }, { isUsed: true });

  const updatedTally = await tally(order);

  const updatedFields = {
    total: updatedTally.total,
    subTotal: updatedTally.subTotal,
    charges: updatedTally.charges,
  };

  // Save the updated order
  await Orders.findOneAndUpdate({ _id: order._id }, { $set: updatedFields });

  const orderAfterCoupon = await Orders.findOne({ orderUuid });

  return {
    message: `Coupon ${coupon.couponName} Applied successfully`,
    success: true,
    data: orderAfterCoupon,
  };
}

module.exports = { addItemToCart, applySelectedCoupon, removeItemFromCart };
