const mongoose = require('mongoose')
const accountSchema = new mongoose.Schema({
    user: String,
    balance: Number
  });
  const Account = mongoose.model('Account', accountSchema);
  module.exports = Account