const {Product} = require('../model/product')

const addProduct = (req,res)=>{
    const { name , price , stock_quantity} = req.body;

    const newProduct = {
        name,
        price,
        stock_quantity
    }

    Product.create(newProduct)

    res.json({
        message:newProduct
    })
}


const getProducts = async (req,res)=>{

    const products  = await Product.findAll()
    res.json(products)
}

const deleteProducts = async(req,res)=>{
    const {productId} = req.body
    if(!productId){
        res.json({
            message:"Please Enter Product Id"
        })
    }

    await Product.destroy({
        where:{
            name : productId
        }
    })


    res.json({
        message:"Product Deleted SuccessFully"
    })

}


module.exports = {addProduct , getProducts , deleteProducts}