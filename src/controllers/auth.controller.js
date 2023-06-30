const UserModel = require("../models/user.model");

const bcrypt = require("bcrypt");

const jwt  = require("jsonwebtoken");


const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const isExisted = await UserModel.findOne({ email })

        if (isExisted?._id) {
            res.status(409).json({ message: "Email already in use" })
        }

        else {
            const salt = await bcrypt.genSalt();

            const passwordHash = await bcrypt.hash(password, salt)
            const newUser = new UserModel({
                name, email,
                password: passwordHash,
            })

            const savedUser = await newUser.save();
            savedUser.password = null;

            res.status(200).json(savedUser)
        }



    } catch (error) {
        next(error);

    }
}



const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email })
        if (!user?._id) {
            return res.status(400).json({ message: 'User not found' })
        }
        else {
            const isMatched = await bcrypt.compare(password, user.password)

            if (!isMatched) {
                return res.status(404).json({ message: 'Password did not match' })
            }
            else {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
                const loggedInUser = {
                    email: user.email,
                    name: user.name,
                    _id: user._id,
                }
                res.status(200).json({ loggedInUser, token })
            }
        }


    } catch (error) {
        next(error);
    }
}


module.exports = { register, login }