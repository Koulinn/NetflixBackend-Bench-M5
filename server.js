import express from 'express'
import cors from 'cors'
import {corsConfig} from './lib/server-config.js'
import mediaRouter from './services/media/index.js'


const server = express()



// const trustOrigins = [process.env.FE_DEV_TRUST_URL, process.env.FE_PROD_TRUST_URL]


// const setCorsConfig = {
//     origin: function(origin, callback){
//         if(!origin || listTrustableOrigins.includes(origin)){
//             callback(null, true)
//         } else{
//             callback(new Error('Origin not allowed'))
//         }
//     }
// }

server.use(cors(corsConfig))
server.use('/media', mediaRouter)


// Errors middlewares


const port = process.env.PORT
server.listen(port, ()=>{
    console.log('Server running port = ' + port)
})

server.on('error', (err)=> console.log(err))