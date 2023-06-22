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
            req.session.user = loginUser.firstName + " " + loginUser.lastName;
            req.session.email = loginUser.email;
            req.session.role = loginUser.role
            req.session.admin = loginUser.role == 'user' ? false : true;

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

export const registerResponse = (req, res, next) => {
    try {
        res.redirect('/profile')
    } catch (error) {
        next(error)
    }
}

export const loginResponse = async (req, res, next) => {
    try {
        const user = req.body
        const loginUser = await userManager.loginUser(user)

        if (loginUser) {
            req.session.user = loginUser.firstName + " " + loginUser.lastName;
            req.session.email = loginUser.email;
            req.session.role = loginUser.role
            req.session.admin = loginUser.role == 'user' ? false : true;

            res.redirect('/profile')
        } else {
            res.redirect('/errorLogin')
        }
    } catch (error) {
        next(error)
    }
}

export const githubResponse = async (req, res, next) => {
    try {
        const { firstName, lastName, email, role } = req.user;

        // res.json({
        //     msg: 'Register/Login Github OK',
        //     session: req.session,
        //     userData: {
        //         firstName,
        //         lastName,
        //         email,
        //         role
        //     }
        // })

        res.redirect('/profileGithub')
    } catch (error) {
        next(error);
    }
}

