const User = require('../models/user')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const PRIVATE_KEY = fs.readFileSync(
    path.join(
        __dirname,
        '..',
        '..',
        'keys',
        'private.pem'
    )
)

const hashPassword = async (password, salt) => {
    return crypto
            .createHmac('sha256', salt)
            .update(password)
            .digest('hex')
}

exports.signUp = async (req, res) => {

    try{

        const {
            firstName,
            lastName,
            username,
            emailAddress,
            password
        } = req.body

        const salt = crypto.randomUUID()

        const encpy_password = await hashPassword(password, salt)

        const user = new User({
            firstName: firstName,
            lastName: lastName ? lastName : '',
            username: username ? username : emailAddress,
            emailAddress: emailAddress,
            salt: salt,
            encpy_password: encpy_password
        })

        const response = await user.save()

        const token = jwt.sign(
            {
                _id: response._id, //User ID
                user: {
                    email: response.emailAddress, 
                    firstName: response.firstName, //User firstName
                    role: response.role
                }
            },
            PRIVATE_KEY, //Private Key
            {
                algorithm: 'RS256', //Algorithm
                allowInsecureKeySizes: true, //Must Be False In Production
                expiresIn: '30min' //Expiry 
            }
        )
        response.salt = undefined
        response.encpy_password = undefined

        let time = new Date() //get current time
        time.setTime(time.getTime() + 1800 * 1000) //change the time to unix

        //generate cookie with name auth and value as jwtToken
        res.cookie("auth", token, {
            expire: time, //expire time
            path: "/", //path of the cookie
            domain: process.env.DOMAIN, //domain of the site
        })

        res.status(201).json({
            success: true,
            message: 'User Created Successfully!',
            token:token,
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

exports.signIn = async (req, res) => {

    try{

        const {
            emailAddress,
            password
        } = req.body

    
        const response = await User.findOne({ emailAddress })

        if(!response) 
            return res.status(401).json({
                error: true,
                message: 'User / Password Incorrect!'
            })

        const encpy_password = await hashPassword(password, response.salt)

        if(encpy_password !== response.encpy_password)
                return res.status(401).json({
                    error: true,
                    message: 'User / Password Incorrect!'
                })
                
        const token = jwt.sign(
            {
                _id: response._id, //User ID
                user: {
                    email: response.emailAddress, 
                    firstName: response.firstName, //User firstName
                    role: response.role
                }
            },
            PRIVATE_KEY, //Private Key
            {
                algorithm: 'RS256', //Algorithm
                allowInsecureKeySizes: true, //Must Be False In Production
                expiresIn: '30min' //Expiry 
            }
        )
        response.salt = undefined
        response.encpy_password = undefined

        let time = new Date() //get current time
        time.setTime(time.getTime() + 1800 * 1000) //change the time to unix

        //generate cookie with name auth and value as jwtToken
        res.cookie("auth", token, {
            expire: time, //expire time
            path: "/", //path of the cookie
            domain: process.env.DOMAIN, //domain of the site
        })

        res.status(200).json({
            success: true,
            message: 'Logged In!',
            dbRes: response,
            token: token
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

exports.loggout = async (req, res) => {
    try {
        //Clear The Cookie 
        res.clearCookie('auth', { path: '/', domain: process.env.DOMAIN, expires: new Date(1) })
        //Give Success Status 
        res.status(200).json({
            logout: true,
            redirect: true
        })
    }catch(err) {
        //If Error Give Error Response 
        res.status(400).json({
            error: true,
            message: err
        })
    }
   
}