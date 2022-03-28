import express from "express";
import {
  getOMDBData,
  checkMovieOnJSON,
  editMovieText,
  addMovieJSON,
  deleteMovie,
  addReview,
  addPosterToJSON,
  deleteReview,
  getSingleMovie,
} from "../../lib/service-utils.js";
import {
  movieFieldsValidation,
  commentValidation,
} from "../../lib/validations.js";
import multer from "multer";
import {
  cloudinaryStorage,
  createPDFPipeline,
} from "../../lib/export-utils.js";
// import {requestSpeedLimiter} from '../../lib/server-config.js'

const mediaRouter = express.Router();

mediaRouter
  .route("/")
  // .get(requestSpeedLimiter, checkMovieOnJSON, getOMDBData)
  .get(checkMovieOnJSON, getOMDBData)
  .post(movieFieldsValidation, addMovieJSON);

mediaRouter
  .route("/:id")
  .put(editMovieText)
  .delete(deleteMovie)
  .get(getSingleMovie);
// .post('/:id/poster', multer({storage:cloudinaryStorage}).single('Poster'), addPosterToJSON)

// mediaRouter.get("/", checkMovieOnJSON, getOMDBData)
// mediaRouter.put('/:id', editMovieText)
// mediaRouter.post('/', addMovieJSON)
// mediaRouter.delete('/:id', deleteMovie)
// POSTER
mediaRouter.post(
  "/:id/poster",
  multer({ storage: cloudinaryStorage }).single("Poster"),
  addPosterToJSON
);

//Reviews
mediaRouter.post("/:id/review", commentValidation, addReview);
mediaRouter.delete("/:id/review/:reviewID", deleteReview);

// DownloadPDF
mediaRouter.get("/:id/pdf", createPDFPipeline);

export default mediaRouter;
