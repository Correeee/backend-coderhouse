import jwt from "jsonwebtoken";
import UserManagerMongoose from "../daos/mongoose/userDao.js";
import UserResponse from "../dtos/users/userResponse.js";
import cookieParser from "cookie-parser";


const userDao = new UserManagerMongoose()

const PRIVATE_KEY = '1234'

export const generateToken = (user) => {

    const payload = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        role: user.role
    }

    const token = jwt.sign(payload, PRIVATE_KEY, {
        expiresIn: '30m'
    })


    return token
}

export const checkAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'] || req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ msg: 'Unauthorized AUTH HEADER' })
        }

        const token = authHeader.split(' ')[1];

        const decodeToken = jwt.verify(token, PRIVATE_KEY)

        const user = await userDao.getById(decodeToken.id)
        if (!user) {
            return res.status(401).json({ msg: 'Unauthorized USER' })
        }

        req.user = new UserResponse(user);
        
        next()
    } catch (error) {
        console.log(error)
    }
}

