import { productsModel } from "../daos/mongoose/models/productsModel.js";
import { generateProductFaker } from "../utils/userUtils.js";

export const createProductMocka = async (req, res, next) => {
    const productArray = []
    const cant = 100
    for (let i = 0; i < cant; i++) {
        const product = generateProductFaker();
        productArray.push(product)
    }

    // const products = await productsModel.create(productArray)
    res.send(productArray)
    // return productArray
}