import MessagesModel from "../daos/mongoose/messageDao.js"
import { logger } from "../utils/logger.js"

const messagesModel = new MessagesModel()

export const saveMessagesController = async (req, res, next) => {
    try {
        const { uid } = req.params
        const { message } = req.body

        const msgSaves = await messagesModel.saveMessage(uid, message)

        if (!msgSaves) {
            logger.error('El mensaje no pudo ser creado.')
            throw new Error('El mensaje no pudo ser creado.')
        } else {
            res.json(msgSaves)
        }

    } catch (error) {
        next(error)
    }
}

export const getMessagesController = async (req, res, next) => {
    try {

        const messages = await messagesModel.getMessages()

        if (!messages) {
            logger.error('No se pudo obtener los mensajes.')
            throw new Error('No se pudo obtener los mensajes.')
        } else {
            res.json(messages)
        }

    } catch (error) {
        next(error)
    }
}