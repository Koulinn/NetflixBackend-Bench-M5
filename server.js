import express from 'express'
import cors from 'cors'
import {corsConfig} from './lib/server-config.js'
import mediaRouter from './services/media/index.js'
import { notFoundErrorHandler, badRequestErrorHandler, serverErrorHandler } from './lib/error-Handlers.js'


const server = express()




server.use(express.json())
server.use(cors(corsConfig))
server.use('/media', mediaRouter)


// Errors middlewares
server.use(notFoundErrorHandler)
server.use(badRequestErrorHandler)
server.use(serverErrorHandler)




const port = process.env.PORT
server.listen(port, ()=>{
    console.log('Server running port = ' + port)
})

server.on('error', (err)=> console.log(err))