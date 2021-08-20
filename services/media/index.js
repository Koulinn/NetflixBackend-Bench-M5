import  express  from "express";
import {getOMDBData, checkMovieOnJSON} from '../../lib/service-utils.js'



const mediaRouter = express.Router()

mediaRouter.get("/", checkMovieOnJSON, getOMDBData)
mediaRouter.put('/:id')

export default mediaRouter