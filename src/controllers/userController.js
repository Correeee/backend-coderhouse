import UserManagerMongoose from "../daos/mongoose/userDao.js";

const userManager = new UserManagerMongoose()

export const createUserController = async (req, res, next) => {
    try {
        const user = req.body
        const newUser = await userManager.createUser(user)

        if (newUser) {
            res.redirect('/profile')
            console.log(`Usuario ${user.email} creado con éxito.`)
        } else {
            res.redirect('/errorRegister')
            console.log('No se pudo crear el usuario.')
        }
    } catch (error) {
        next(error)
    }
}

export const loginUserController = async (req, res, next) => {
    try {
        const user = req.body
        const loginUser = await userManager.loginUser(user)

        if (loginUser) {
            res.redirect('/profile')
            console.log(`Usuario ${user.email} logueado con éxito.`)
        } else {
            res.redirect('/errorLogin')
            console.log('El usuario no puede ser logueado.')
        }
    } catch (error) {
        next(error)
    }
}