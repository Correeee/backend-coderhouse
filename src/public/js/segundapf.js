const socketClient = io();

const welcome = document.getElementById('user-name')
const role = document.getElementById('role')

const userData = fetch('/users/profile')
    .then(res => res.json())
    .then(data => {
        welcome.innerText = data.email;
        role.innerText = data.role.toUpperCase();
    })
    .catch((error) => {
        welcome.innerText = '-';
        role.innerText = '-';
        console.log(error)
    })


const list = document.getElementById('product-list')

socketClient.on('arrayProducts', (arrayProducts) => {

    arrayProducts.docs.map(producto => {
        let li = document.createElement('li')
        li.classList.add('product__item')
        li.innerText = `Producto: ${producto.title} - Precio: $${producto.price} - Descripción: ${producto.description} - Categoría: ${producto.category} - Code: ${producto.code} - Stock: ${producto.stock}`
        list.appendChild(li)
    })


})









