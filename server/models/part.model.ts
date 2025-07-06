// server/models/Part.ts
import mongoose from 'mongoose';

const PartSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
});

export default mongoose.model('Part', PartSchema);