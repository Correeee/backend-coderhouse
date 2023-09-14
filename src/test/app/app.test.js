import app from "../../server";
import mongoose from "mongoose";
import request from "supertest";
import { faker } from "@faker-js/faker/locale/es";
import { expect } from "chai";

let accessToken = ''
let userEmail = ''
let userPassword = ''
let userId = ''

describe('SESSIONS >> TEST', () => {

    beforeEach(async () => {
        mongoose.connection.collections['users']
    })

    test('[POST] /users/registerJWT', async () => {

        const user = {
            firstName: faker.person.fullName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: faker.number.int({ min: 18, max: 99 }),
            password: "123456"
        }

        let response = await request(app).post('/users/registerJWT').send(user)
        response = response.body

        expect(response).to.be.property('msg')
        expect(response.msg).to.be.a('string')

        expect(response).to.be.property('token')
        expect(response.token).to.be.a('string')

        accessToken = response.token
        userEmail = user.email
        userPassword = user.password
    })

    test('[POST] /users/loginJWT', async () => {

        const userLogin = {
            email: userEmail,
            password: userPassword
        }

        let response = await request(app).post('/users/loginJWT').send(userLogin)
        response = response.body

        expect(response).to.be.property('msg').includes('Login OK')
        expect(response.msg).to.be.a('string')

        expect(response).to.be.property('accessToken')
        expect(response.accessToken).to.be.a('string')

        expect(response).to.be.property('id')
        expect(response.accessToken).to.be.a('string')

        userId = response.id
        accessToken = response.accessToken

    })

    test('[PUT] /users/premium/:uid', async () => {
        let response = await request(app).put(`/users/premium/${userId}`)

        expect(response).to.be.property('text')

        response = response.text

        expect(response).to.be.a('string')
        expect(response).includes(`Usuario ${userId} --> Premium: Activado` || `Usuario ${userId} --> Premium: Desactivado`)
    })

    test('[GET] /users', async () => {

        const headers = {
            'Authorization': `Bearer ${accessToken}`
        };

        const response = await request(app).get('/users/current').set(headers)
        const getRes = response.body
        const status = getRes.status
        const firstName = getRes.firstName
        const lastName = getRes.lastName
        const email = getRes.email
        const age = getRes.age
        const role = getRes.role
        const premium = getRes.premium

        expect(status).to.be.a('string')
        expect(firstName).to.be.a('string')
        expect(lastName).to.be.a('string')
        expect(email).to.be.a('string')
        expect(age).to.be.a('number')
        expect(role).to.be.a('string')
        expect(premium).to.be.a('boolean')

    })

})

let productId = ''

describe('PRODUCTS >> TEST', () => {

    const products = {
        title: faker.commerce.productName(),
        description: faker.lorem.paragraph({ min: 3, max: 6 }),
        category: faker.commerce.productAdjective(),
        code: faker.number.int({ min: 50, max: 999999 }),
        price: faker.commerce.price({ min: 5000, max: 50000, dec: 0 }),
        thumbnail: faker.image.url(),
        stock: faker.number.int({ min: 1, max: 100 }),
        owner: 'admin'
    }

    let productId = ''

    beforeEach(async () => {
        mongoose.connection.collections['products']
    })

    test('[GET] /products', async () => {
        const response = await request(app).get('/products')
        const getRes = response.body.results
        const id = getRes[0]._id
        const title = getRes[0].title
        const description = getRes[0].description
        const category = getRes[0].category
        const code = getRes[0].code
        const price = getRes[0].price
        const thumbnail = getRes[0].thumbnail
        const stock = getRes[0].stock
        const owner = getRes[0].owner

        if (getRes.length > 0) {
            expect(getRes[0]).to.have.property('_id')
            expect(getRes[0]).to.have.property('title')
            expect(getRes[0]).to.have.property('category')
            expect(getRes[0]).to.have.property('price')
            expect(getRes[0]).to.have.property('stock')
            expect(getRes[0]).to.have.property('code')
            expect(getRes[0]).to.have.property('owner')

            expect(id).to.be.a('string')
            expect(title).to.be.a('string')
            expect(description).to.be.a('string')
            expect(category).to.be.a('string')
            expect(code).to.be.a('string')
            expect(price).to.be.a('number')
            expect(thumbnail).to.be.a('string')
            expect(stock).to.be.a('number')
            expect(owner).to.be.a('string')

            productId = getRes[0]._id
        }

    })

    test('[GET] /products', async () => {
        let response = await request(app).get(`/products/${productId}`)
        const getRes = response.body

        const id = getRes._id
        const title = getRes.title
        const description = getRes.description
        const category = getRes.category
        const code = getRes.code
        const price = getRes.price
        const thumbnail = getRes.thumbnail
        const stock = getRes.stock
        const owner = getRes.owner

        expect(getRes).to.have.property('_id')
        expect(getRes).to.have.property('title')
        expect(getRes).to.have.property('category')
        expect(getRes).to.have.property('price')
        expect(getRes).to.have.property('stock')
        expect(getRes).to.have.property('code')
        expect(getRes).to.have.property('owner')

        expect(id).to.be.a('string')
        expect(title).to.be.a('string')
        expect(description).to.be.a('string')
        expect(category).to.be.a('string')
        expect(code).to.be.a('string')
        expect(price).to.be.a('number')
        expect(thumbnail).to.be.a('string')
        expect(stock).to.be.a('number')
        expect(owner).to.be.a('string')

    })

    test('[POST] /products', async () => {

        const headers = {
            'Authorization': `Bearer ${accessToken}`
        }
        const response = await request(app).post('/products').set(headers).send(products)
        expect(response).to.be.a('object')

        const getRes = response.body

        expect(getRes).to.have.property('_id')
        expect(getRes).to.have.property('title')
        expect(getRes).to.have.property('category')
        expect(getRes).to.have.property('price')
        expect(getRes).to.have.property('stock')
        expect(getRes).to.have.property('code')
        expect(getRes).to.have.property('owner')

        expect(getRes._id).to.be.a('string')
        expect(getRes.title).to.be.a('string')
        expect(getRes.description).to.be.a('string')
        expect(getRes.category).to.be.a('string')
        expect(getRes.code).to.be.a('string')
        expect(getRes.price).to.be.a('number')
        expect(getRes.thumbnail).to.be.a('string')
        expect(getRes.stock).to.be.a('number')
        expect(getRes.owner).to.be.a('string')

        productId = getRes._id
    })

    test('[DELETE] /products/:id', async () => {

        const headers = {
            'Authorization': `Bearer ${accessToken}`
        }

        let response = await request(app).delete(`/products/${productId}`).set(headers)
        response = response.text
        expect(response).to.be.a('string')
        expect(response).includes(`¡Producto borrado: ${productId}!`)
    })

})

let cartId = ''

describe('CARTS >> TEST', () => {

    beforeEach(async () => {
        mongoose.connection.collections['carts']
    })

    test('[GET] /carts', async () => {
        const response = await request(app).get('/carts')
        const getRes = response.body[0]
        const id = getRes._id
        const products = getRes.products

        expect(getRes).to.be.property('_id')
        expect(getRes).to.be.property('products')
        expect(id).to.be.a('string')
        expect(products).to.be.a('array')

        cartId = getRes._id
    })

    
    test('[GET] /carts/:id', async () => {
        const response = await request(app).get(`/carts/${cartId}`)
        const getRes = response.body

        expect(getRes).to.be.a('object')

        expect(getRes).to.be.property('_id')
        expect(getRes).to.be.property('products')
        expect(getRes.products).to.be.a('array')

        if(getRes.products.length){
            expect(getRes.products[0]).to.be.property('quantity')
            expect(getRes.products[0].quantity).to.be.a('number')
            expect(getRes.products[0]).to.be.property('product')
            expect(getRes.products[0].product).to.be.a('object')
        }

    })
    
    test('[GET] /carts/:id', async () => {
        const response = await request(app).delete(`/carts/${cartId}`)
        expect(response.text).to.be.a('string')
        expect(response.text).includes(`¡Carrito ${cartId} vaciado!`)
    })

})

