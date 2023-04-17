/* -------------------- DESAFIO 02 ------------------- */

const fs = require('fs')
const path = './desafio-02.json'

class ProductManager {
    #firstId = 0;
    constructor(path) {
        this.path = path;
        this.listProducts = []
    }

    #codeRandom() {
        const numberLetters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let code = []
        const codeLength = 5;

        for (let i = 1; i <= codeLength; i++) {
            let number = parseInt(Math.random() * numberLetters.length)
            code.push(numberLetters[number])
        }

        code = code.join('')
        return code
    }

    #generateId() {
        this.#firstId += 1
        let id = this.#firstId
        return id;
    }

    async addProduct(title, description, price, thumbnail, stock) {
        const product = {
            id: this.#generateId(),
            title,
            description,
            price,
            thumbnail,
            code: this.#codeRandom(),
            stock
        }

        try {
            if (!title || !description || !price || !thumbnail || !stock) {
                return console.log('El usuario no pudo ser creado. Falta uno o más datos.')
            } else {
                if (fs.existsSync(path)) {
                    this.listProducts.push(product)
                    await fs.promises.writeFile(path, JSON.stringify(this.listProducts));
                    return console.log(`¡Producto subido: ${product.title}!`)
                } else {
                    return console.log('No existe dónde guardar el producto.')
                }
            }
        } catch (error) {
            return console.log(error)
        }

    }

    async getProducts() {
        try {
            if (fs.existsSync(path)) {
                if (fs.existsSync(path).length != 0) {
                    const users = await fs.promises.readFile(path, 'utf-8')
                    const usersJSON = JSON.parse(users)
                    return console.log('LISTA DE PRODUCTOS: ', usersJSON)
                }
                else {
                    return console.log('El almacenamiento está vacío.')
                }
            } else {
                return console.log('No existe o no se pudo leer el almacenamiento.')
            }
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
                    return console.log('PRODUCTO ENCONTRADO POR ID: ', productFilter[0])
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
                    if (productFound[0]) {
                        fs.promises.writeFile(path, JSON.stringify(productFilter))
                        return console.log('Producto borrado con éxito: ', productFound)
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

    async updateProduct(idProduct, price) {
        try {
            if (fs.existsSync(path)) {
                if (fs.existsSync(path).length != 0) {
                    const products = await fs.promises.readFile(path, 'utf-8')
                    const productsJSON = JSON.parse(products)
                    let productFilter = productsJSON.filter((prod) => prod.id == idProduct)
                    if(productFilter.length != 0){
                        const productRest = productsJSON.filter((prod) => prod.id != idProduct)
                        productFilter = {...productFilter[0], price: price}
                        const productUpdate = []
                        productUpdate.push(...productRest, productFilter)
                        await fs.writeFileSync(path, JSON.stringify(productUpdate))
                        return console.log('PRODUCTO ACTUALIZADO: ', productFilter)
                    }else{
                        return console.log('La ID del producto NO existe.')
                    }
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

}

const newProduct = new ProductManager()

// newProduct.addProduct('Nintendo Switch', 'Consola de Videojuegos', 150000, 'Sin imagen', 50)
// newProduct.addProduct('Playstation 5', 'Consola', 250000, 'Sin imagen', 10)
// newProduct.addProduct('Auriculares XBOX', 'Accesorio', 25000, 'Sin imagen', 20)

// newProduct.getProducts()
// newProduct.getProductById(1)
// newProduct.deleteProduct(1)
// newProduct.getProductById(1)
// newProduct.updateProduct(1, 999999)
// newProduct.getProducts()




