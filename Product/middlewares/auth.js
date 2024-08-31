const { expressjwt } = require('express-jwt')
const path = require('path')
const fs = require('fs')


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


exports.checkAdmin = async (req, res, next) => {
    let admin = req.auth.user.role
    if(admin === "admin") {
        next()
    }else{
        return res.status(403).json({
            error: true,
            message: "Access Denied!"
        })
    }
}