/* -------------------- DESAFIO 01 ------------------- */

                    /* ------------------------------- COMENTARIOS ------------------------------ */
//Sinceramente, no comprendí si en el desafio CODE e ID son sinónimos, o es algo aparte que había que agregar. Yo lo tomé como dos cosas diferentes, de ser así hasta diría que quedó complejizado el Desafio. Si eran sinónimos está mal redactado, sobretodo si estamos hablando de variables ya que no deberían utilizar sinónimos para nombrarlas. 

//El CODE vendría a estar "hardcodeado" según el ejercicio, mientras que el ID lo generé de forma aleatoria (Si por una casualidad, cosa que es muy dificil, el ID generado es igual a un ID del listProducts: se vuelve a realizar la operación de creación de ID hasta que sea totalmente diferente).


class ProductManager{
    constructor(){
        this.listProducts = []
    }

    #randomId(){
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        const idLength = 10
        let id = [];

        for (let i = 0; i <= idLength; i++) {
            id.push(parseInt(Math.random() * numbers.length))
        }

        id = parseInt(id.join(''))
    
        this.listProducts.forEach(producto =>{
            if(producto.id == id){ //Genera un ID nuevo si ya existe otro igual.
                this.#randomId()
            }
        })
        return id;      
    }

    getProducts(){
        if(this.listProducts.length != 0){
            console.log(this.listProducts[this.listProducts.length-1]) //Devuelve el último producto agregado.
        }
        else{
            console.log(this.listProducts)
        }

    }

    addProduct(){
        const product = {
            title: 'Producto prueba',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc123',
            stock: 25,
            id: this.#randomId(),
        }

        if(this.listProducts.length){ //Si el array tiene contenido...
            this.listProducts.map(producto =>{ //...lo recorre...
                if(producto.code == product.code){ //...y si encuentra un producto con el mismo 'CODE'...
                    console.error('Code ya existente. El producto NO fue agregado.') //...muestra un error...
                }
                else{
                    this.listProducts.push(product) //...sino lo pushea.
                }
            })
        }
        else{
            this.listProducts.push(product) //Si el array está vacio, pushea directamente (No hace falta comprobar CODE).
        }
    }

    getProductById(productId){
        this.listProducts.find(producto => {
            if(producto.code == productId){
                return producto.code == productId
            }
            else{
                console.log('Producto no encontrado')
            }
        })
    }

}

const newProduct = new ProductManager()

//FUNCIONAMIENTO AL EJECUTARSE:

newProduct.getProducts() //DEVUELVE ARREGLO VACIO
newProduct.addProduct() //AGREGA EL PRODUCTO
newProduct.getProducts() //MUESTRA EL ÚLTIMO PRODUCTO AGREGADO
newProduct.addProduct() //COMO EL PRODUCTO TIENE UN 'CODE' YA EXISTEN, NO LO AGREGA.
newProduct.getProducts() //MUESTRA EL ÚLTIMO PRODUCTO AGREGADO
newProduct.getProductById('abc123') //BUSCA PRODUCTO POR CODE. ACÁ VINO EL INCONVENIENTE QUE MENCIONÉ EN LOS COMENTARIOS DEL COMIENZO, NO SÉ SI UTILIZABAN ID Y CODE COMO SINÓNIMOS.







