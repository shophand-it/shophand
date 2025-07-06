import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import mongoose from 'mongoose';

// Create new transaction
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { userId, orderId, amount, paymentMethod, status } = req.body;

    const transaction = new Transaction({
      userId,
      orderId,
      amount,
      paymentMethod,
      status,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ message: 'Server error creating transaction.' });
  }
};

// Get all transactions
export const getTransactions = async (_req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find().populate('userId orderId');
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Fetch transactions error:', error);
    res.status(500).json({ message: 'Server error fetching transactions.' });
  }
};

// Get transaction by ID
export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid transaction ID.' });
    }

    const transaction = await Transaction.findById(id).populate('userId orderId');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found.' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error('Fetch transaction by ID error:', error);
    res.status(500).json({ message: 'Server error fetching transaction.' });
  }
};