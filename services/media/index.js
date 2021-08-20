import  express  from "express";
import {getOMDBData, checkMovieOnJSON, editMovieText, addMovieJSON, deleteMovie, addReview, addPosterToJSON} from '../../lib/service-utils.js'
import {movieFieldsValidation} from '../../lib/validations.js'
import multer from "multer";
import { cloudinaryStorage } from "../../lib/export-utils.js";



const mediaRouter = express.Router()

mediaRouter.get("/", checkMovieOnJSON, getOMDBData)
mediaRouter.put('/:id', editMovieText)
mediaRouter.post('/', addMovieJSON)
mediaRouter.delete('/:id', deleteMovie)
// POSTER
mediaRouter.post('/:id/poster', multer({storage:cloudinaryStorage}).single('Poster'), addPosterToJSON)




//Reviews
mediaRouter.post('/:id/review', addReview)
export default mediaRouter