console.log('HOLA')

import {createServer} from 'http'

const server = createServer((req, res)=>{
    res.end('Mi primer servidor')
})

server.listen(8080, ()=>{
    console.log('Server en puerto 8080')
})
