const Order = require('../models/Order');
const Product = require('../models/Product');

// POST /api/orders (protected) - create order
exports.createOrder = async (req, res) => {
  const {
    orderItems, shippingAddress, paymentMethod,
    itemsPrice, shippingPrice, taxPrice, totalPrice
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  const order = new Order({
    user: req.user.id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
  });

  const created = await order.save();
  res.status(201).json(created);
};

// GET /api/orders/myorders (protected) - user orders
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('user', 'name email');
  res.json(orders);
};

// GET /api/orders (admin) - list all orders
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
};

// GET /api/orders/:id (protected) - get order
exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
};

// PUT /api/orders/:id/deliver (admin) - mark delivered / update status
exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  const { status, isDelivered } = req.body;
  if (status) order.status = status;
  if (typeof isDelivered === 'boolean') {
    order.isDelivered = isDelivered;
    order.deliveredAt = isDelivered ? Date.now() : null;
  }
  await order.save();
  res.json(order);
};

// DELETE /api/orders/:id (admin)
exports.deleteOrder = async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json({ message: 'Order deleted' });
};
