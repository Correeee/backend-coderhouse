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
            console.log(`Usuario ${loginUser[0].email} logueado con éxito.`)

            req.session.user = loginUser[0].firstName + " " + loginUser[0].lastName;
            req.session.email = loginUser[0].email;
            req.session.role = loginUser[0].role
            req.session.admin = loginUser[0].role == 'user' ? false : true;

            res.redirect('/profile')

        } else {
            res.redirect('/errorLogin')
            console.log('El usuario no puede ser logueado.')
        }
    } catch (error) {
        next(error)
    }
}

export const profileInfoController = (req, res) => {

    const userData = {
        email: req.session.email,
        role: req.session.role,
        admin: req.session.admin
    }

    res.json(userData)
}

export const logoutController = (req, res) => {

    req.session.destroy((err) => {
        if (!err) res.redirect('/login');
        else res.send({ status: 'Logout ERROR', body: err });
    });

}