                            /* -------------------- DESAFIO 01 ------------------- */

class ProductManager{
    #firstId = 0;
    constructor(){
        this.products = []
    }

    #generateId(){
        this.#firstId += 1
        let id = this.#firstId
        return id;      
    }

    getProducts(){
        if(this.products.length != 0){
            console.log(this.products) //Devuelve la lista completa.
        }
        else{
            console.log(this.products)
        }
    }

    addProduct(title, description, price, thumbnail, stock){
        if(title, description, price, thumbnail, stock){
            const product = {
                title,
                description,
                price,
                thumbnail,
                stock,
                id: this.#generateId(), //Por la forma en que se genera NO se va a repetir, no hace falta validarlo.
            }
            this.products.push(product) 
        }else{
            console.log('El producto NO pudo ser agregado a la lista.')
        }            
    }

    getProductById(id){
        console.log(this.products.find(producto => producto.id == id) || 'Producto NO encontrado.')
    }

}

const newProduct = new ProductManager()


newProduct.getProducts() 
newProduct.addProduct('Nintendo', 'Consola de Videojuegos', 150000, 'Sin Imagen', 50)
newProduct.addProduct('PS4', 'Consola de Videojuegos', 120000, 'No existe', 20)
newProduct.getProducts() 
newProduct.getProductById()









