const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')



const categorySchema = Schema({

    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    categoryExcerpt: {
        type: String,
        required: false
    },
    status: {
        type: String,
        requried: true,
        enums: ['publish', 'draft', 'delete']
    }
 
}, { timestamps: true })

categorySchema.plugin(mongoosePaginate)

const Category = model('Category', categorySchema)


module.exports = Category