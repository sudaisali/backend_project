const express = require('express')
const router = express.Router()
const  product = require('../controller/products')
const {performTransaction ,addUser} = require('../controller/transaction')




router.route('/addProduct')
.post(product.addProduct)

router.route('/getProduct')
.get(product.getProducts)

router.route('/deleteProduct')
.get(product.deleteProducts)


router.route('/performtransaction')
.post(performTransaction)


router.route('/adduser')
.post(addUser)





module.exports = router