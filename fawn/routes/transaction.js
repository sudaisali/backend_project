const express = require('express')
const router = express.Router()
const {createUser , performTransaction} = require('../controller/transactions')


router.post('/createuser',createUser)
router.post('/performtransaction',performTransaction)



module.exports = {router}



