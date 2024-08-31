const { Router } = require('express')
const { signIn, signUp, loggout } = require('../controllers/auth')


const router = Router()


router.post('/signin', signIn)
router.post('/signup', signUp)

router.get('/logout', loggout)


module.exports = router