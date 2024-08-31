const Product = require('../models/product')



exports.createProduct = async (req, res) => {
    try{

        const {
           productName,
           productExcerpt,
           productDescription,
           productImages,
           mrpAmount,
           productPrice,
           status,
           category
        } = req.body

        const product = new Product({
            productName: productName,
            productExcerpt: productExcerpt,
            productDescription: productDescription,
            productImages: productImages,
            mrpAmount: mrpAmount,
            productPrice: productPrice,
            status: status,
            category: category
        })

        const response = await product.save()

        res.status(201).json({
            success: true,
            message: 'Product Created Successfully!',
            dbRes: response
        })
        


    }catch(err) {
        return res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occured!',
            errorJSON: err,
            errorString: err.toString()
        })
    }
}


exports.getProducts = async (req, res) => {
    try{

        const pageOptions = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            sort: { createdAt: -1 },
            select: 'productName productImages mrpAmount productPrice category',
            populate: { path: 'category' },
            
        }
        const queryDB = {
            status: 'publish',
        }
        if(req.query.category)
            queryDB.category = req.query.category
        if(req.query.search)
            queryDB.productName = { $regex: new RegExp(req.query.search), $options: "i" }

        const products = await Product.paginate(queryDB, pageOptions)

        res.status(200).json({
            success: true,
            message: 'Products Fetched!',
            dbRes: products
        })


    }catch(err) {
        console.log(err)
        return res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occured!',
            errorJSON: err,
            errorString: err.toString()
        })
    }
}

exports.getProductById = async (req, res) => {
    try{

        const {
            productId
        } = req.params
        const product = await Product.findOne({ _id: productId, status: 'publish' }).populate('category')
       
        if(!product)
            return res.status(404).json({
                error: true,
                message: `No Product Found With ID: ${productId}`
            })

        res.status(200).json({
            success: true,
            message: `Product Fetched With ID: ${productId}`,
            dbRes: product
        })


    }catch(err) {
        return res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occured!',
            errorJSON: err,
            errorString: err.toString()
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try{

        const {
            productId
        } = req.body
        const product = await Product
                                    .updateOne(
                                        {
                                            _id: productId
                                        },
                                        {
                                            $set: {
                                                status: 'delete'
                                            }
                                        }
                                    )

        res.status(200).json({
            success: true,
            message: `Deleted Product With ID: ${productId}`,
            dbRes: product
        })


    }catch(err) {
        return res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occured!',
            errorJSON: err,
            errorString: err.toString()
        })
    }
}

exports.updateProduct = async (req, res) => {
    try{

        const {
            productId,
            updateData
        } = req.body
        const product = await Product
                                    .updateOne(
                                        {
                                            _id: productId
                                        },
                                        {
                                            $set: updateData
                                        }
                                    )

        res.status(200).json({
            success: true,
            message: `Updated Prodcut With ID: ${categoryId}`,
            dbRes: product
        })


    }catch(err) {
        return res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occured!',
            errorJSON: err,
            errorString: err.toString()
        })
    }
}
