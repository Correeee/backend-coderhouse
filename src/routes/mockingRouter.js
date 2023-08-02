import { Router } from "express";
import { createProductMocka } from "../controllers/fakerController.js";

const routeMocking = Router()

routeMocking.post('/', createProductMocka)

export default routeMocking;