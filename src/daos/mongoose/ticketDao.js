import { ticketModel } from "./models/ticketModel.js";

export default class TicketManagerMongoose {
    async createCode() {
        try {
            const response = await ticketModel.find({})
            const codes = response.map(prod => parseInt(prod.code))
            if (!codes.length) {
                return 1
            } else {
                const newTicketCode = Math.max(...codes) + 1
                return newTicketCode
            }

        } catch (error) {
            console.log(error)
        }
    }

    async createTicket(obj) {
        try {
            const response = await ticketModel.create(obj)
            return response
        } catch (error) {
            console.log(error)
        }
    }


}