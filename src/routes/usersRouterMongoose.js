import { Router } from "express";
import { createUserController, githubResponse, loginResponse, loginUserController, logoutController, profileInfoController, registerResponse, premiumUserController, userDocuments, allUsers, deleteUsers } from "../controllers/userController.js";
import passport from "passport";
import { frontResponseGithub } from "../passport/github.js";
import { checkAuth } from "../jwt/auth.js";
import { isAdminHandler } from "../middlewares/isAdminHandler.js";


const router = Router()

/* -------------------------------- PASSPORT -------------------------------- */

// router.post('/register', passport.authenticate('register'), registerResponse)
// router.post('/login', passport.authenticate('login'), loginResponse)
// router.post('/logout', logoutController)
// router.get('/profile', profileInfoController)

// router.get('/registerGithub', passport.authenticate('githubPassport', { scope: ['user:email'] }))
// router.get('/profileGithub', passport.authenticate('githubPassport', { scope: ['user:email'] }), githubResponse)

/* -------------------------- JWT - JSON WEB TOKEN -------------------------- */
/* ---------------------------- UTILIZAR ESTAS RUTAS ---------------------------- */

router.post('/registerJWT', createUserController)
router.post('/loginJWT', loginUserController)
router.put('/premium/:uid', premiumUserController)
router.post('/premium/:uid/documents', userDocuments)
router.get('/all', allUsers)
router.delete('/delete', deleteUsers)
router.get('/current', checkAuth, (req, res) => {

    res.json({
        status: 'Sucess',
        ...req.user
    })

})


export default router;