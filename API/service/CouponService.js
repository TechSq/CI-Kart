function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result.toUpperCase();
}

// Function to generate a unique coupon code
function generateUniqueCouponCode(existingCodes, length) {
  let couponCode;
  do {
    couponCode = generateRandomString(length);
  } while (existingCodes.includes(couponCode));
  return couponCode;
}

module.exports = { generateUniqueCouponCode };
