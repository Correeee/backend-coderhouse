const socketClient = io();

const form = document.getElementById('form')
const inputProduct = document.getElementById('product')
const inputPrice = document.getElementById('price')
const list = document.getElementById('div__list_ul')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = inputProduct.value
    const price = inputPrice.value
    socketClient.emit('newProduct', { title: title, price: price })
    alert('¡Producto agregado!')
})

socketClient.on('arrayProducts', (arrayProducts) => {

    arrayProducts.map(producto => {
        let li = document.createElement('li')
        li.innerText = `${producto.title} - PRICE: $${producto.price}`
        list.appendChild(li)
    })

})

socketClient.on('arrayNewProduct', (lastProduct) => {
    let li = document.createElement('li')
    li.innerText = `${lastProduct.title} - PRICE: $${lastProduct.price}`
    list.appendChild(li)
})

