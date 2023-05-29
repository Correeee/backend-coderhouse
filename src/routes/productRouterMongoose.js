import { Router } from "express";
import {
    createProductController,
    deleteProductController,
    getAllController,
    getProductsByIdController,
    updateProductController
} from "../controllers/productsController.js";

const router = Router()

router.get('/', getAllController);

router.get('/:id', getProductsByIdController);

router.post('/', createProductController);

router.put('/:id', updateProductController);

router.delete('/:id', deleteProductController);

export default router;