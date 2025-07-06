import { Request, Response } from 'express';
import Order from '../models/Order';
import mongoose from 'mongoose';

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, parts, totalAmount, shippingAddress } = req.body;

    const newOrder = new Order({
      userId,
      parts,
      totalAmount,
      shippingAddress,
      status: 'pending',
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error creating order.' });
  }
};

// Get all orders (for admin)
export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('userId parts.partId');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ message: 'Server error fetching orders.' });
  }
};

// Get orders by user ID
export const getOrdersByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const orders = await Order.find({ userId }).populate('parts.partId');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Get orders by user error:', error);
    res.status(500).json({ message: 'Server error fetching user orders.' });
  }
};

// Update order status
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updated = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error updating order.' });
  }
};