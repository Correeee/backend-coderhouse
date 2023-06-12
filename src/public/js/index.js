const socketClient = io();

const form = document.getElementById('form')
const inputProduct = document.getElementById('product')
const inputDescription = document.getElementById('description')
const inputCategory = document.getElementById('category')
const inputCode = document.getElementById('code')
const inputPrice = document.getElementById('price')
const inputStock = document.getElementById('stock')
const inputThumbnail = document.getElementById('thumbnail')
const list = document.getElementById('div__list_ul')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = inputProduct.value
    const description = inputDescription.value
    const price = inputPrice.value
    const category = inputCategory.value
    const code = inputCode.value
    const stock = inputStock.value
    const thumbnail = inputThumbnail.value
    socketClient.emit('newProduct', { title: title, description: description, category: category, code: code, price: price, stock: stock, thumbnail: thumbnail })
    alert('¡Producto agregado!')
})

socketClient.on('arrayProducts', (arrayProducts) => {
    console.log(arrayProducts.docs)
    arrayProducts.docs.map(producto => {
        let li = document.createElement('li')
        li.innerText = `Producto: ${producto.title} - Precio: $${producto.price} - Descripción: ${producto.description} - Categoría: ${producto.category} - Code: ${producto.code} - Stock: ${producto.stock}`
        list.appendChild(li)
    })

})

socketClient.on('arrayNewProduct', (lastProduct) => {
    let li = document.createElement('li')
    li.innerText = `${lastProduct.title} - PRICE: $${lastProduct.price}`
    list.appendChild(li)
})



