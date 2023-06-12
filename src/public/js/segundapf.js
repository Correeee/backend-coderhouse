const socketClient = io();

const welcome = document.getElementById('user-name')
// welcome.innerText = `Bienvenido/a ${userFirstName}`

const list = document.getElementById('product-list')

socketClient.on('arrayProducts', (arrayProducts) => {
    console.log(arrayProducts.docs)
    arrayProducts.docs.map(producto => {
        let li = document.createElement('li')
        li.classList.add('product__item')
        li.innerText = `Producto: ${producto.title} - Precio: $${producto.price} - Descripción: ${producto.description} - Categoría: ${producto.category} - Code: ${producto.code} - Stock: ${producto.stock}`
        list.appendChild(li)
    })

})
