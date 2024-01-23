import express from 'express'
import mongoose from 'mongoose'
import invoice from './src/models/invoice.js'

const app = express()
mongoose.connect('mongodb://localhost:27017/imaker')
const invoiceData = {
    invoiceNumber: "INV-001",
    issueDate: new Date(),
    dueDate: new Date(),
    totalAmount: 0, // You might calculate this based on the items
    status: "pending",
    items: [
      { description: "Item 1", quantity: 2, price: 10, total: 20 },
      { description: "Item 2", quantity: 1, price: 15, total: 15 },
      // Add more items as needed
    ],
  };
  async function insertInvoice(invoiceData) {
    const newInvoice = new invoice(invoiceData);
    return await newInvoice.save();
  }
  insertInvoice(invoiceData)


app.listen(()=>{
    console.log('server is started')
})