/* -------------------- DESAFIO 02 ------------------- */
import fs from 'fs';

const path = 'src/manager/ProductManager.json'

class ProductManager {
    #firstId = 0;
    constructor(path) {
        this.path = path;
        this.listProducts = []
    }

    async #generateId() {

        const products = await fs.promises.readFile(path, 'utf-8')
        const productJSON = JSON.parse(products)
        if(productJSON.length > 0){
            const products = await this.getProducts()
            let id = products[products.length-1].id + 1
            return id;
        }else{
            this.#firstId += 1
            let id = this.#firstId
            return id;
        }

    }

    async getProducts() {
        try {

            if (fs.existsSync(path)) {
                const products = await fs.promises.readFile(path, 'utf-8')
                if(products.length == 0){
                    await fs.promises.writeFile(path, JSON.stringify([]))
                }else{
                    const productsJSON = JSON.parse(products)
                    return productsJSON
                }
            } else {
                return []
            }

        } catch (error) {
            return console.log(error)
        }
    }

    async addProduct(obj) {

        try {
            const product = {
                id: await this.#generateId(),
                ...obj
            }
            const all = await this.getProducts()
            all.push(product)
            await fs.promises.writeFile(path, JSON.stringify(all));
            return product
        } catch (error) {
            return console.log(error)
        }

    }

    async getProductById(idProduct) {
        try {
            if (fs.existsSync(path)) {
                if (fs.existsSync(path).length != 0) {
                    const products = await fs.promises.readFile(path, 'utf-8')
                    const productsJSON = JSON.parse(products)
                    const productFilter = productsJSON.filter((prod) => prod.id == idProduct)
                    return productFilter[0]
                } else {
                    return console.log('El almacenamiento está vacío.')
                }
            } else {
                return console.log('No existe o no se pudo leer el almacenamiento.')
            }
        } catch (error) {
            return console.log(error)
        }
    }

    async deleteProduct(idProduct) {
        try {
            if (fs.existsSync(path)) {
                if (fs.existsSync(path).length != 0) {
                    const products = await fs.promises.readFile(path, 'utf-8')
                    const productsJSON = JSON.parse(products)
                    const productFound = productsJSON.filter((prod) => prod.id == idProduct); //PRODUCTO
                    const productFilter = productsJSON.filter((prod) => prod.id != idProduct); // NUEVO ARRAY
                    if (productFound) {
                        await fs.promises.writeFile(path, JSON.stringify(productFilter))
                        return productFound
                    } else {
                        return console.log('El producto NO pudo ser borrado. El producto es inexistente.')
                    }
                } else {
                    return console.log('El almacenamiento está vacío.')
                }
            } else {
                return console.log('No existe el producto o almacenamiento.')
            }
        } catch (error) {
            return console.log(error)
        }
    }

    async updateProduct(obj, id) {
        try {
            const productsFile = await this.getProducts();
            const index = productsFile.findIndex(prod => prod.id === id);
            console.log('Index:', index);
            if (index === -1) {
                throw new Error(`ID: ${id} not found`)
            } else {
                productsFile[index] = { ...obj, id }
            }
            await fs.promises.writeFile(path, JSON.stringify(productsFile));
            return productsFile[index]
        } catch (error) {
            console.log(error);
        }
    }

}

const newProduct = new ProductManager()

const test = async () => {
    try {
        await newProduct.getProducts()
        await newProduct.addProduct({ title: 'Nintendo Switch', description: 'Consola de Videojuegos',category: 'Consolas', code: 'C1', price: 150000, thumbnail: 'Sin imagen', stock: 50 })
        await newProduct.addProduct({ title: 'Playstation 5', description: 'Consola de Videojuegos', category: 'Consolas', code: 'C2', price: 250000, status: true, thumbnail: 'Sin imagen', stock: 10 })
        await newProduct.addProduct({ title: 'Auriculares XBOX', description: 'Accesorio para XBOX', category: 'Accesorios', code: 'A1', price: 20000, status: true, thumbnail: 'Sin imagen', stock: 32 })
        await newProduct.addProduct({ title: 'Nintendo 3DS', description: 'Consola de Videojuegos', category: 'Consolas', code: 'C3', price: 100000, status: true, thumbnail: 'Sin imagen', stock: 23 })
        await newProduct.addProduct({ title: 'Mouse Logitech', description: 'Accesorio para PC', category: 'Accesorios', code: 'A2', price: 10000, status: true, thumbnail: 'Sin imagen', stock: 10 })
        await newProduct.addProduct({ title: 'HP 14', description: 'Notebooks', category: 'PCs', code: 'P1', price: 250000, status: true, thumbnail: 'Sin imagen', stock: 30 })
        await newProduct.addProduct({ title: 'HP 12', description: 'Notebooks', category: 'PCs', code: 'P2', price: 200000, status: true, thumbnail: 'Sin imagen', stock: 5 })
        await newProduct.addProduct({ title: 'Xiaomi MI 10t', description: 'Celular', category: 'Celulares', code: 'CE1', price: 112000, status: true, thumbnail: 'Sin imagen', stock: 2 })
        await newProduct.addProduct({ title: 'Iphone 14', description: 'Celular', category: 'Celulares', code: 'CE2', price: 500000, status: true, thumbnail: 'Sin imagen', stock: 40 })
        await newProduct.addProduct({ title: 'Iphone 13', description: 'Celular', category: 'Celulares', code: 'CE3', price: 400000, status: true, thumbnail: 'Sin imagen', stock: 65 })
        await newProduct.addProduct({ title: 'Iphone 12', description: 'Celular', category: 'Celulares', code: 'CE4', price: 250000, status: true, thumbnail: 'Sin imagen', stock: 65 })
        // await newProduct.getProductById(1)
        // await newProduct.deleteProduct(2)
        // await newProduct.updateProduct({ title: 'Nintendo Switch', description: 'Consola de Videojuegos', price: 150000, thumbnail: 'Sin imagen', stock: 5000 }, 1)
    } catch (error) {
        console.log(error)
    }
}

// test()

export default ProductManager;