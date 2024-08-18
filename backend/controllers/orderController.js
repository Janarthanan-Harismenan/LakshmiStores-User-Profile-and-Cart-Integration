const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

// Create Order - /api/v1/order
exports.createOrder = async (req, res, next) => {
  console.log(req.body);

  const { cartItems } = req.body;

  console.log(cartItems);

  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const order = await orderModel.create({
    cartItems,
    amount: totalPrice,
  });

  console.log(cartItems);

  cartItems.forEach(async (item) => {
    const product = await productModel.findById(item._id);
    product.stock = product.stock - item.quantity;
    await product.save();
  });

  res.json({
    success: true,
    message: "Create Order Working!",
    order: order,
  });
};
