// server/models/Transaction.ts
import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  amount: Number,
  paymentMethod: String, // e.g., 'stripe', 'cashapp'
  status: { type: String, default: 'pending' }, // e.g., 'pending', 'paid', 'failed'
}, { timestamps: true });

export default mongoose.model('Transaction', TransactionSchema);