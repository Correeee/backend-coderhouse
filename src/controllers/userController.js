import cookieParser from "cookie-parser";
import UserManagerMongoose from "../daos/mongoose/userDao.js";
import { checkAuth, generateToken } from "../jwt/auth.js";
import { logger } from "../utils/logger.js";
import uploadFile from "../utils/uploadFiles.js";

const userManager = new UserManagerMongoose()

export const createUserController = async (req, res, next) => {
    try {
        const { firstName, lastName, email, age, password, premium } = req.body
        const userExist = await userManager.getByEmail(email)

        if (userExist) return res.status(401).json({ msg: 'User already exist.' })

        const user = { firstName, lastName, email, age, password, premium }

        const newUser = await userManager.createUser(user)

        const token = generateToken(newUser)

        res.json({
            msg: 'Register ok',
            token
        })

    } catch (error) {
        next(error)
    }
}

export const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = { email, password }

        const loginUser = await userManager.loginUser(user)

        if (!loginUser) {
            logger.error('Invalid credentials')
            return res.json({ msg: 'Invalid credentials' })
        } else {
            const accessToken = generateToken(loginUser)
            res.header('authorization', accessToken).json({ msg: 'Login OK', accessToken, id: loginUser._id })
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
        res.send(req.user)
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

            res.send({
                user: req.session.user,
                email: req.session.email,
                role: req.session.role,
                admin: req.session.admin
            })

        } else {
            logger.error('User inexistent')
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

export const premiumUserController = async (req, res, next) => {
    try {
        const { uid } = req.params
        const userUpdate = await userManager.updatePremium(uid)
        res.send(`Usuario ${uid} --> Premium: ${userUpdate.premium == true ? 'Activado' : 'Desactivado'} `)
    } catch (error) {
        next(error)
    }
}

export const userDocuments = async (req, res, next) => {
    try {
        const { uid } = req.params
        const response = await checkAuth(req, res)

        if (response === undefined) {

            const file = await uploadFile(req, res)
                .then((filePath) => {
                    return filePath
                })
                .catch((error) => {
                    res.status(500).json({ error: error.message });
                });

            if (file) {

                const documents = {
                    date: new Date().toLocaleString(),
                    filePath: file
                }

                await userManager.sendDocuments(uid, documents)
                res.status(200).json(documents)
            }

        }

    } catch (error) {
        next(error)
    }
}

