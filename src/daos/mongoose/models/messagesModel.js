import mongoose from "mongoose";

const messageCollection = 'messages'

const messageSchema = new mongoose.Schema({
    message: {type: String, required: true}
},
{
    timestamps: true
})

export const messagesModel = mongoose.model(messageCollection, messageSchema)