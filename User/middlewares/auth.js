const { expressjwt } = require('express-jwt')
const path = require('path')
const fs = require('fs')

const { getUserBy_id } = require('../controllers/user')


const PUBLICKEY = fs.readFileSync(
    path.join(
        __dirname,
        '..',
        '..',
        'keys',
        'public.pem'
    )
)

exports.checkJwt = expressjwt({
    secret: PUBLICKEY, //Public Key 
    userProperty: "auth", //Property Of Decrypted JWT Token
    algorithms: ['RS256'] //Algorithm For JWT Token ( RS256 Currently )
})


exports.checkAuthentication = async (req, res, next) => {
    //Check if user exists
    let user = await getUserBy_id(req.auth._id)
    if(user)
        next() //Exits So Call The Next Function
    else
        return res.status(401).json({ //Else Call The Error Function
            error: true,
            message: "Unauthorized!"
        })

}