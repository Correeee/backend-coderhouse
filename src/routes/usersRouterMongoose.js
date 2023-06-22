import { Router } from "express";
import { createUserController, githubResponse, loginResponse, loginUserController, logoutController, profileInfoController, registerResponse } from "../controllers/userController.js";
import passport from "passport";
import { frontResponseGithub } from "../passport/github.js";


const router = Router()

router.post('/register', passport.authenticate('register'), registerResponse)
router.post('/login', passport.authenticate('login'), loginResponse)

router.post('/logout', logoutController)
router.get('/profile', profileInfoController)

router.get('/registerGithub', passport.authenticate('githubPassport', { scope: ['user:email'] }))
router.get('/profileGithub', passport.authenticate('githubPassport', { scope: ['user:email'] }), githubResponse)

export default router;