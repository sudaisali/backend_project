const express = require('express')
const sequelize = require('./database')
const {Product} = require('./model/product')
const {Customer} = require('./model/customer')
const {Sale} = require('./model/sales')
const {SaleItem} = require('./model/saleItem')
const productRouter = require('./routes/products')
const app = express()
app.use(express.json())
Customer.hasMany(Sale , {
  foreignKey:'customerId'
})
Sale.belongsTo(Customer , {
  foreignKey:'customerId'
})
//  Customer.create({
//     name: 'Burhan',
//     email: 'Sudaisali420@gmail.com',
   
//   });
//   Sale.create({

//     amount: 1,
//    customerId:1
   
//   });
  // SaleItem.create({

  //   quantity: 1,
  //  subtotal:100
   
  // });

  // Sale.findAll({
  //   where:{
  //     customerId : 1
  //   },
  //   include : Customer
   
  // }).then((sales)=>console.log(sales))
  

app.use('/api',productRouter)
// app.post('/addProduct',addProduct)

async function Connection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync(); 
        // Customer.create({
        //   name: 'Burhan',
        //   email: 'Sudaisali420@gmail.com',
         
        // });
        // Sale.create({
      
        //   amount: 1,
        //  customerId:1
         
        // });
        // SaleItem.create({

        //   quantity: 1,
        //  subtotal:100
         
        // });
      
        
  // Sale.create({

  //   amount: 100,
  //  customerId:2
   
  // });
        //   console.log('New Product created successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

Connection()


app.listen(3000,()=>{
    console.log("server is started")
})