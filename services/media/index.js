import  express  from "express";
import {getOMDBData, checkMovieOnJSON, editMovieText, addMovieJSON, deleteMovie, addReview, addPosterToJSON, deleteReview } from '../../lib/service-utils.js'
import {movieFieldsValidation} from '../../lib/validations.js'
import multer from "multer";
import { cloudinaryStorage, createPDFPipeline } from "../../lib/export-utils.js";



const mediaRouter = express.Router()

mediaRouter.route('/')
    .get(checkMovieOnJSON, getOMDBData)
    .post(addMovieJSON)

mediaRouter.route('/:id')
    .put(editMovieText)
    .delete(deleteMovie)
    // .post('/:id/poster', multer({storage:cloudinaryStorage}).single('Poster'), addPosterToJSON)


// mediaRouter.get("/", checkMovieOnJSON, getOMDBData)
// mediaRouter.put('/:id', editMovieText)
// mediaRouter.post('/', addMovieJSON)
// mediaRouter.delete('/:id', deleteMovie)
// POSTER
mediaRouter.post('/:id/poster', multer({storage:cloudinaryStorage}).single('Poster'), addPosterToJSON)

//Reviews
mediaRouter.post('/:id/review', addReview)
mediaRouter.delete('/:id/review/:reviewID', deleteReview)

// DownloadPDF
mediaRouter.get('/:id/pdf', createPDFPipeline)



export default mediaRouter