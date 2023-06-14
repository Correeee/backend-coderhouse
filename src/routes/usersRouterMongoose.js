import { Router } from "express";
import { createUserController, loginUserController, logoutController, profileInfoController } from "../controllers/userController.js";

const router = Router()

router.post('/register', createUserController)
router.post('/login', loginUserController)
router.post('/logout', logoutController)
router.get('/profile', profileInfoController)

export default router;