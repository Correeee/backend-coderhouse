import { userModel } from "./models/userModel.js"

export default class UserManagerMongoose {

    async createUser(user) {
        try {
            const { firstName, lastName, email, age, password } = user

            const userExist = await userModel.find({ email })
            if (userExist.length == 0) {
                if (email == 'adminCoder@coder.com') {
                    const newUser = await userModel.create({ ...user, role: 'admin' })
                    return newUser
                } else {
                    const newUser = await userModel.create(user)
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
            const userExist = await userModel.find({ email, password })
            if (userExist.length != 0) {
                return userExist
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }


}