//NPM Imports
require('dotenv').config()

const express = require('express') //Express.Js
const mongoose = require('mongoose') //Mongoose.Js
const cors = require('cors')



//Route Middleware
const { checkJwt } = require('./middlewares/auth')

const productRoutes = require('./routes/product')
const categoryRoutes = require('./routes/category')



//Configuration 
const PORT = process.env.PORT || 9000
const DATBASE_URI = process.env.DATABASE_URI
 


const app = express() //Init Express App

//Middlewares
app.use(cors({
    origin: "http://localhost:5173", //Split The ORIGIN String into array
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'], // Methods Allowed
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'], //Headers Allowed
    credentials: true, //Are Credentials Required
}))

app.use(express.json())


//Routes
app.use('/category', categoryRoutes)
app.use('/product', productRoutes)


//Middleware Custom Response
app.use(async (err, req, res, next ) => {
    //If Error Name === 'UnauthorizedError'
    if (err.name === "UnauthorizedError") 
        //Return the 401 Error (Custom Error)
        return res.status(401).json({
            error: true,
            message: `${err.inner.name}: ${err.inner.message}`
        })
    else 
        next(err) //If No Error Take Call The Next Function
})


//Database Connection 
mongoose
    .connect(DATBASE_URI,  {
        
    })
    .then(() => {
        console.log("Database Connected!")
        app.listen(PORT, () => {
            console.log(`Server Running At PORT: ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })