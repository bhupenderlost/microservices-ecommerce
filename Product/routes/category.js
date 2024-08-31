const { Router } = require('express')
const { 
    createCategory, 
    updateCategory, 
    deleteCategory, 
    getCategories, 
    getCategoryById 
} = require('../controllers/category')
const { 
    checkAdmin,
    checkJwt
} = require('../middlewares/auth')

const router = Router()


router.post('/create', checkJwt, checkAdmin, createCategory)
router.put('/update', checkJwt, checkAdmin, updateCategory)
router.delete('/delete', checkJwt, checkAdmin, deleteCategory)
router.get('/all', getCategories)
router.get('/id/:categoryId', getCategoryById)



module.exports = router