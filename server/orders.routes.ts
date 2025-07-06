import express from 'express';
import {
  createOrder,
  getOrdersByUser,
  getAllOrders,
  updateOrderStatus
} from '../controllers/ordersController';

const router = express.Router();

router.post('/', createOrder);
router.get('/user/:userId', getOrdersByUser);
router.get('/', getAllOrders);
router.put('/:orderId/status', updateOrderStatus);

export default router;