import mongoose from "mongoose";
import itemSchema from './item.js'

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: { type: String, required: true },
    issueDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, required: true },
    items: [itemSchema], // Array of items
  });
  
  const Invoice = mongoose.model("Invoice", invoiceSchema);

  export default Invoice