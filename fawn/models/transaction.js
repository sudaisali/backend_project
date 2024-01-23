const mongoose = require('mongoose')
const transactionSchema = new mongoose.Schema({
    source: String,
    destination: String,
    value: Number,
    state: String,
  });


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction