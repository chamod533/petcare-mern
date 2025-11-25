const express = require('express');
const router = express.Router();
const {
  createOrder, getMyOrders, getAllOrders, getOrderById, updateOrderStatus, deleteOrder
} = require('../controllers/orderController');

const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

router.post('/', verifyToken, createOrder);            // create order
router.get('/myorders', verifyToken, getMyOrders);     // user orders
router.get('/:id', verifyToken, getOrderById);         // order details
router.get('/', verifyToken, verifyAdmin, getAllOrders); // admin list orders
router.put('/:id/deliver', verifyToken, verifyAdmin, updateOrderStatus); // admin update status
router.delete('/:id', verifyToken, verifyAdmin, deleteOrder); // admin delete order

module.exports = router;
