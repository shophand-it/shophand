// server/models/Order.ts
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  parts: [
    {
      partId: { type: mongoose.Schema.Types.ObjectId, ref: 'Part' },
      quantity: Number,
    },
  ],
  totalAmount: Number,
  shippingAddress: String,
  status: { type: String, default: 'pending' },
}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);