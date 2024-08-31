const { Router } = require('express')
const { getProfile, getUserById } = require('../controllers/user')
const { 
    checkJwt
 } = require('../middlewares/auth')

const router = Router()


router.get('/profile', checkJwt, getProfile)
router.get('/profile/:userId', getUserById)



module.exports = router