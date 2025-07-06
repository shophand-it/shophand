import mongoose, { Schema, Document } from 'mongoose';

export interface IVendor extends Document {
  name: string;
  email: string;
  phone?: string;
  companyName: string;
  location?: string;
  categories: string[]; // e.g., ['auto', 'marine', 'aircraft']
  isVerified: boolean;
}

const VendorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    companyName: { type: String, required: true },
    location: { type: String },
    categories: [{ type: String, required: true }],
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Vendor = mongoose.model<IVendor>('Vendor', VendorSchema);
export default Vendor;