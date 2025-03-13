import express from 'express';
import { orders, users } from '../server.js';

const router = express.Router();

// Create order
router.post('/', (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
  const user = users.find(u => u._id === req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const order = {
    _id: String(orders.length + 1),
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    isPaid: false,
    isDelivered: false,
    paidAt: null,
    deliveredAt: null,
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  res.status(201).json(order);
});

// Get user orders
router.get('/myorders', (req, res) => {
  const userOrders = orders.filter(o => o.user._id === req.user.id);
  res.json(userOrders);
});

// Get all orders (admin only)
router.get('/', (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  res.json(orders);
});

// Update order to paid
router.put('/:id/pay', (req, res) => {
  const order = orders.find(o => o._id === req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = new Date().toISOString();
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// Update order to delivered (admin only)
router.put('/:id/deliver', (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const order = orders.find(o => o._id === req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = new Date().toISOString();
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

export default router; 