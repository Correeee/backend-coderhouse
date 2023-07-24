import { Router } from "express";
import { sendMailEthereal } from "../controllers/emailController.js";

const routerEmail = Router()

routerEmail.post('/', sendMailEthereal)

export default routerEmail;