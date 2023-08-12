import { Router } from "express";
import { logger, loggerTest } from "../utils/logger.js";


const loggerRouter = Router()

loggerRouter.get('/', loggerTest)

export default loggerRouter