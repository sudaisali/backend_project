import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    description: { type: String, default: "", index: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
})


  
export default itemSchema;