const { Schema, model, ObjectId } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')




const prodctSchema = Schema({

    productName: {
        type: String,
        required: true,
    },
    productExcerpt: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        requried: true,
    },
    productImages: [],
    mrpAmount: {
        type: Number,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enums: ['draft', 'delete', 'publish']
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    }

}, { timestamps: true })

prodctSchema.plugin(mongoosePaginate)

const Product = model('Product', prodctSchema)

module.exports = Product