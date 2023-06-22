import { createHash, passwordValidator } from "../../utils/bcrypt.js"
import { userModel } from "./models/userModel.js"


export default class UserManagerMongoose {

    async createUser(user) {
        try {
            const { firstName, lastName, email, age, password } = user

            const userExist = await userModel.find({ email })
            if (userExist.length == 0) {
                if (email == 'adminCoder@coder.com') {
                    const newUser = await userModel.create({ ...user, password: createHash(password), role: 'admin' })
                    return newUser
                } else {
                    const newUser = await userModel.create({ ...user, password: createHash(password) })
                    return newUser
                }
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }

    async loginUser(user) {
        try {
            const { email, password } = user
            const userExist = await userModel.findOne({ email })

            if (userExist.length != 0) {
                const hashPassword = userExist.password
                const passwordValid = passwordValidator(password, hashPassword)

                if (!passwordValid) {
                    return false
                } else {
                    return userExist
                }
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getByEmail(email) {
        try {
            const userExist = await userModel.findOne({ email });
            if (userExist) {
                return userExist
            } return false
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async getById(id) {
        try {
            const userExist = await userModel.findById(id)
            if (userExist) {
                return userExist
            } return false
        } catch (error) {
            console.log(error)
        }
    }

}