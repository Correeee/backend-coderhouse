import mongoose from "mongoose";
import 'dotenv/config'

const connectionString = process.env.MONGO_ATLAS_URL

try {
    await mongoose.connect(connectionString)
    console.log('¡Conectado a la base de datos!')
} catch (error) {
    console.log(error)
}
