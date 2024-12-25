import mongoose, { Schema, Document } from 'mongoose';

const PurchaseItemSchema: Schema = new Schema({
  shortDescription: { type: String, required: true },
  price: { type: Number, required: true },
});

// Define the Mongoose schema for Receipt
const ReceiptSchema: Schema = new Schema({
  retailer: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  purchaseTime: { type: String, required: true },
  total: { type: Number, required: true },
  items: { type: [PurchaseItemSchema], required: true },
});

// Define the TypeScript interface for PurchaseItem
export interface PurchaseItem {
  shortDescription: string;
  price: number;
}
// Define the TypeScript interface for Receipt
export interface Receipt extends Document {
  retailer: string;
  purchaseDate: Date;
  purchaseTime: string;
  total: number;
  items: PurchaseItem[];
}

// Create and export the Mongoose model
export const Receipt = mongoose.model<Receipt>('Receipt', ReceiptSchema);
