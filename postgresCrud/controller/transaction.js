const Account = require('../model/transaction')
const sequelize = require('../database')

const performTransaction = async (req,res) => {
 const { fromUser, toUser, amount}  = req.body;
  const trans = await sequelize.transaction();

  try {
    const fromAccount = await Account.findOne({
      where: { user: fromUser },
      transaction: trans,
    });

    const toAccount = await Account.findOne({
      where: { user: toUser },
      transaction: trans,
    });
    if (!fromAccount || !toAccount) {
      res.status(400).json({ message: 'User is not Exist' });
      return
    }
    if (fromAccount.status !== 'active') {
      res.status(400).json({message:'User is not active'});
      return
    }
    if (fromAccount.balance < amount) {
      res.status(400).json({message:'Insufficent balance for transaction'});
      return
    }
    if (toAccount.status !== 'active') {
      res.status(400).json({message:'User is Not active'});
      return
    }
    if (amount <= 100) {
      res.status(400).json({message:'Amount must be greater than hundred'});
      return
    }
    await Account.update(
      { balance: sequelize.literal(`balance - ${amount}`) },
      { where: { user: fromUser }, transaction: trans }
    );
    await Account.update(
      { balance: sequelize.literal(`balance + ${amount}`) },
      { where: { user: toUser }, transaction: trans }
    );
    await trans.commit();
    console.log('Transaction successful');
    res.status(200).json({
        status:"success",
        message:"Transaction SuccessFull"
    })
  } catch (error) {
    console.error(`Transaction failed: ${error}`);
    try {
      await trans.rollback();
      console.log('Transaction rolled back successfully');
      res.status(400).json({
        message:"Transaction Roll back"
      })
      res.status(404).json({
        status:"Failed",
        message:"Sorry Transaction Failed"
      })
    } catch (rollbackError) {
      console.error(`Rollback failed: ${rollbackError}`);

    }
  }
};


const addUser = async (req, res) => {
    try {
      const { user, balance, status } = req.body;
      const newUser = await Account.create({
        user,
        balance,
        status,
      });
  
      res.json(newUser);
    } catch (error) {
      console.error('Error adding user:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


module.exports = {performTransaction , addUser}
