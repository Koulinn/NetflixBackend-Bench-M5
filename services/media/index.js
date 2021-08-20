import  express  from "express";
import {getOMDBData, checkMovieOnJSON, editMovieText} from '../../lib/service-utils.js'
import {movieFieldsValidation} from '../../lib/validations.js'



const mediaRouter = express.Router()

mediaRouter.get("/", checkMovieOnJSON, getOMDBData)
mediaRouter.put('/:id', editMovieText)
mediaRouter.post('/:id', editMovieText)

export default mediaRouter