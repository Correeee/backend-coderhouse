import { Router } from "express";
import { saveMessagesController, getMessagesController } from "../controllers/messageController.js";


const messageRouter = Router()

messageRouter.get('/', getMessagesController)
messageRouter.post('/:uid', saveMessagesController)

export default messageRouter;