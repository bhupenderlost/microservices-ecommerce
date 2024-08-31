const { Router } = require('express')
const { 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    getProducts, 
    getProductById 
} = require('../controllers/product')

const { 
    checkAdmin,
    checkJwt
} = require('../middlewares/auth')

const router = Router()


router.post('/create', checkJwt, checkAdmin, createProduct)
router.put('/update', checkJwt, checkAdmin, updateProduct)
router.delete('/delete', checkJwt, checkAdmin, deleteProduct)
router.get('/all', getProducts)
router.get('/id/:productId', getProductById)



module.exports = router