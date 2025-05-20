const Product = require('../models/productModel')


const getProducts = async(req,res) => {
    try {
        const allProducts = await Product.find()

        if(!allProducts || allProducts.length === 0){
            res.json({
                message:"There is No Product"
            })
        }

        res.status(200).json({
            success:true,
            products:allProducts,
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
    }
}

const createProduct = async(req,res) =>{
    try {
        const {name,price,description,category} = req.body
        const newProduct = new Product({name,price,description,category})
        await newProduct.save()
        res.status(200).json({
            product:newProduct
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
    }
}

const updateProduct = async(req,res) =>{
    try {
        console.log("put aya re")
        const {id} = req.params
        const {name,price,description,category} = req.body

        const updatedProduct = await Product.findByIdAndUpdate
        (id,{name,price,description,category},{new:true})

        if(!updateProduct)
{
    res.status().json({
        message:"cannot find product"
    })
}
        res.status(200).json({
            product:updatedProduct
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
    }
}

const deleteProduct = async(req,res) =>{
    try {
        
        const {id} = req.params
        const deletedProduct = await Product.findByIdAndDelete(id)
        if(!deletedProduct){
            res.json({
                message:"Product not found cannot delete"
            })
        }

        res.status(200).json({
            message:"Product deleted successfully",
            product:deletedProduct
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
    }
}

module.exports = {getProducts,updateProduct,createProduct,deleteProduct}