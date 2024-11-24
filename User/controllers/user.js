const User = require('../models/user')



exports.getUserBy_id = async (userId) => {

    try{

        let user = await User
                    .findOne({ _id: userId })
                    .select("-salt -encpy_password -createdAt -updatedAt")

        if(!user)
            return null

        return user

    }catch(err) {

        return null

    }
}

exports.getUserById = async (req, res) => {
    try {

        const userId = req.params.userId

        let user = await this.getUserBy_id(userId)

        user.emailAddress = undefined

        user.salt
        if(!user)
            return res.status(404).json({
                error: true,
                message: 'Content Not Found!'
            })

        res.json({
            success: true,
            message: "User Fetched!",
            dbRes: user
        })

    }catch(err) {

        res.status(400).json({
            error: true,
            message: "An Unexpected Error Occurrred",
            errorJSON: err,
            errorString: err.toString()
        })
        
    }
}

exports.getProfile = async (req, res) => {

    try {

        const userId = req.auth._id

        let user = await this.getUserBy_id(userId)

        if(!user)
            return res.status(404).json({
                error: true,
                message: 'Content Not Found!'
            })

        res.json({
            success: true,
            message: "User Fetched!",
            dbRes: user
        })

    }catch(err) {
        return res.status(400).json({
            error: true,
            message: "An Unexpected Error Occurrred",
            errorJSON: err,
            errorString: err.toString()
        })
        
    }
}