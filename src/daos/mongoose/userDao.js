import { createHash, passwordValidator } from "../../utils/bcrypt.js"
import { userModel } from "./models/userModel.js"


export default class UserManagerMongoose {

    async createUser(user) {
        try {
            const { firstName, lastName, email, age, password, premium } = user

            const userExist = await userModel.find({ email })
            if (userExist.length == 0) {
                if (email == 'adminCoder@coder.com') {
                    const newUser = await userModel.create({ ...user, password: createHash(password), role: 'admin', premium: true })
                    return newUser
                } else {
                    const newUser = await userModel.create({ ...user, password: createHash(password), premium: premium != true ? false : true })
                    return newUser
                }
            } else {
                return null
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async loginUser(user) {
        try {
            const { email, password } = user
            const userExist = await userModel.findOne({ email })

            if (userExist.length != 0) {
                const hashPassword = userExist.password
                const passwordValid = passwordValidator(password, hashPassword)
                await userModel.findOneAndUpdate({ email: email }, { $set: { lastConnection: new Date().toLocaleString() } })
                if (!passwordValid) {
                    return false
                } else {
                    return userExist
                }
            } else {
                return null
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async getByEmail(email) {
        try {
            const userExist = await userModel.findOne({ email });
            if (userExist) {
                return userExist
            } return false
        } catch (error) {
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
            throw new Error(error)
        }
    }

    async updatePremium(uid) {
        try {

            const userExist = await userModel.findById(uid)

            const userUpdate = { ...userExist._doc, premium: !userExist._doc.premium }
            await userModel.findByIdAndUpdate(uid, userUpdate)
            return userUpdate
        } catch (error) {
            throw new Error(error)
        }
    }

    async sendDocuments(uid, documents) {
        try {
            const userExist = await userModel.findById(uid)
            if (userExist) {
                const userUpdate = await userModel.findByIdAndUpdate(uid, { $set: { documents: [...userExist.documents, { ...documents }] } })
                return userUpdate
            } else {
                return false
            }
        } catch (error) {
            throw new Error('El usuario no existe o no se pudo actualizar los Documentos.')
        }
    }

    async getAllUsers() {
        try {

            const allUsers = await userModel.find()
            const userPrincipalData = []
            allUsers.map(user => {
                const userData = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                }
                userPrincipalData.push(userData)
            })

            return userPrincipalData
        } catch (error) {
            throw new Error('No se pudo obtener todos los usuarios')
        }
    }

    async deleteUsers() {
        try {

            const allUsers = await userModel.find()
            const toDeleteUsers = []
            allUsers.map(user => {
                if (user.lastConnection) {
                    const userDate = user.lastConnection.split(',')[0]
                    const localDate = new Date().toLocaleString().split(',')[0]

                    const splitDateOne = userDate.split('/');
                    const dateOne = new Date(splitDateOne[2], splitDateOne[1] - 1, splitDateOne[0]);

                    const splitDateTwo = localDate.split('/');
                    const dateTwo = new Date(splitDateTwo[2], splitDateTwo[1] - 1, splitDateTwo[0]);

                    const differenceMS = Math.abs(dateOne - dateTwo);
                    const daysDifference = differenceMS / (1000 * 60 * 60 * 24);
                    if (daysDifference >= 2) {
                        toDeleteUsers.push(user.id)
                    }
                }
            })

            if (toDeleteUsers.length) {
                const response = await userModel.deleteMany({ _id: { $in: toDeleteUsers } })
                return response
            }else{
                return false
            }

        } catch (error) {
            throw new Error('No se pudo obtener todos los usuarios')
        }
    }
}