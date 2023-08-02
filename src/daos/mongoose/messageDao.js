import { messagesModel } from "./models/messagesModel.js";

export default class MessagesModel {

    async saveMessage(uid, message) {

        try {
            const response = await messagesModel.create({ user: uid, message: message })
            return response
        } catch (error) {
            throw new Error(error)
        }

    }

    async getMessages(){
        try {
            const response = await messagesModel.find({})
            return response
        } catch (error) {
            throw new Error(error)
        }
    }
}