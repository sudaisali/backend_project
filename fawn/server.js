const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express')
const app = express()
mongoose.connect('mongodb://localhost/fawn');
const {router} = require('./routes/transaction')
Fawn.init(mongoose);
app.use(express.json())



app.use('/api',router)





// const accountSchema = new mongoose.Schema({
//   user: String,
//   balance: Number,
// });

// const Account = mongoose.model('Account', accountSchema);

// async function performTransaction(fromUser, toUser, amount) {
//   try {
//     await Fawn.Task()
//       .update('accounts', { user: fromUser }, { $inc: { balance: -amount } })
//       .update('accounts', { user: toUser }, { $inc: { balance: amount } })
//       .run();

//     console.log('Transaction successful');
//   } catch (error) {
//     console.error(`Transaction failed: ${error}`);
//   }
//   // const roller = Fawn.Roller();
//   // await roller.roll();
//   // console.log('Incomplete transactions rolled back');
// }


// async function main() {
//   try {
    
//     // await Account.create([
//     //   { user: 'Talha', balance: 100 },
//     //   { user: 'Burhan', balance: 100 },
//     // ]);

    
//     const initialAccounts = await Account.find();
//     console.log('Initial Account Balances:');
//     initialAccounts.forEach(account => {
//       console.log(`${account.user}: ${account.balance}`);
//     });

    
//     await performTransaction('Talha', 'Burhan', 10);

   
//     const updatedAccounts = await Account.find();
//     console.log('\nAccount Balances after Transaction:');
//     updatedAccounts.forEach(account => {
//       console.log(`${account.user}: ${account.balance}`);
//     });

//   } catch (error) {
//     console.error(`Error: ${error}`);
//   }
// }

// main();


app.listen(3000,()=>{
  console.log('server is started')
})



