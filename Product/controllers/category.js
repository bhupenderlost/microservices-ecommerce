const Category = require('../models/category')



exports.createCategory = async (req, res) => {
    try{

        const {
           categoryName,
           categoryExcerpt
        } = req.body

        const category = new Category({
            categoryName: categoryName,
            categoryExcerpt: categoryExcerpt ? categoryExcerpt : ''
        })

        const response = await category.save()

        res.status(201).json({
            success: true,
            message: 'Category Created Successfully!',
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

exports.getCategories = async (req, res) => {
    try{

        const categories = await Category.find()

        res.status(200).json({
            success: true,
            message: 'Categories Fetched!',
            dbRes: categories
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

exports.getCategoryById = async (req, res) => {
    try{

        const {
            categoryId
        } = req.params
        const category = await Category.findOne({ _id: categoryId}).select('categoryName')
       
        if(!category)
            return res.status(404).json({
                error: true,
                message: `No Category Found With ID: ${categoryId}`
            })

        res.status(200).json({
            success: true,
            message: `Category Fetched With ID: ${categoryId}`,
            dbRes: category
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

exports.deleteCategory = async (req, res) => {
    try{

        const {
            categoryId
        } = req.body
        const category = await Category
                                    .updateOne(
                                        {
                                            _id: categoryId
                                        },
                                        {
                                            $set: {
                                                status: 'delete'
                                            }
                                        }
                                    )

        res.status(200).json({
            success: true,
            message: `Deleted Category With ID: ${categoryId}`,
            dbRes: category
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

exports.updateCategory = async (req, res) => {
    try{

        const {
            categoryId,
            updateData
        } = req.body
        const category = await Category
                                    .updateOne(
                                        {
                                            _id: categoryId
                                        },
                                        {
                                            $set: updateData
                                        }
                                    )

        res.status(200).json({
            success: true,
            message: `Updated Category With ID: ${categoryId}`,
            dbRes: category
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
