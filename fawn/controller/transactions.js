const Account = require('../models/accounts')
const Fawn = require('fawn');

async function createUser(req,res){
        const { user, balance } = req.body;
        try {
          const newAccount = new Account({ user, balance });
          await newAccount.save();
          res.json({ message: 'User created successfully', user: newAccount });
        } catch (error) {
          console.error(`User creation failed: ${error}`);
          res.status(500).json({ error: 'User creation failed' });
        }
}


const performTransaction = async (req, res) => {
    const { fromUser, toUser, amount } = req.body;
    try {
      const fromAccount = await Account.findOne({ user: fromUser });
      const toAccount = await Account.findOne({ user: toUser });
      if (!fromAccount || !toAccount) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (fromAccount.balance < amount) {
        return res.status(400).json({ error: 'Insufficient balance for the transaction' });
      }
      await Fawn.Task()
        .update('accounts', { user: fromUser }, { $inc: { balance: -amount } })
        .update('accounts', { user: toUser }, { $inc: { balance: amount } })
        .run();
      res.json({ message: 'Transaction successful' });
    } catch (error) {
      console.error(`Transaction failed: ${error}`);
      try {
        await Fawn.Roller().roll();
        console.log('Transaction rolled back successfully');
      } catch (rollbackError) {
        console.error(`Rollback failed: ${rollbackError}`);
      }
  
      res.status(500).json({ error: 'Transaction failed' });
    }
  };
  
  

  module.exports = {createUser , performTransaction}