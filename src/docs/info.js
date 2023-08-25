export const info = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Backend Coderhouse',
            version: '1.0.0',
            description: 'Ecommerce Backend realizado durante el curso de Coderhouse.'
        },
        servers: [
            { url: 'http://localhost:8080' }
        ]
    },
    apis: ['./src/docs/*.yml']
}