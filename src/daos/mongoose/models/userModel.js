import mongoose from "mongoose";

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    premium: { type: Boolean, default: false },
    documents: { type: Array, default: [] },
    lastConnection: { type: String, require: false }
}, {
    timestamps: true
})

export const userModel = mongoose.model(userCollection, userSchema);