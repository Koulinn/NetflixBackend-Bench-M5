import  express  from "express";
import {getOMDBData, checkMovieOnJSON, editMovieText, addMovieJSON} from '../../lib/service-utils.js'
import {movieFieldsValidation} from '../../lib/validations.js'



const mediaRouter = express.Router()

mediaRouter.get("/", checkMovieOnJSON, getOMDBData)
mediaRouter.put('/:id', editMovieText)
mediaRouter.post('/', addMovieJSON)

export default mediaRouter