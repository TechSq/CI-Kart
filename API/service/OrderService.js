const { Orders, Products, Coupons } = require("../models");
const { OrderStatus } = require("../shared/constant-values");

async function placeOrder(orderUuid, authCustomer) {
  const order = await Orders.findOne({ orderUuid });

  if (!order || order?.orderStatus !== OrderStatus.InCart) {
    return {
      message: "Order not found for cart",
      success: false,
      data: {},
    };
  }

  const updatedFields = {
    customer: {
      id: authCustomer._id,
      userUuid: authCustomer.userUuid,
      firstName: authCustomer.firstName,
      lastName: authCustomer.lastName,
      email: authCustomer.email,
      phoneNumber: authCustomer.phoneNumber,
    },
    orderStatus: OrderStatus.Placed,
  };

  // Save the updated order
  await Orders.findOneAndUpdate({ _id: order._id }, { $set: updatedFields });

  return {
    message: "Order placed successfully",
    success: true,
    data: {},
  };
}

module.exports = { placeOrder };
