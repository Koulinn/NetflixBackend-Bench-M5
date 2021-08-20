import  express  from "express";
import {getOMDBData, checkMovieOnJSON} from '../../lib/service-utils.js'



const mediaRouter = express.Router()

mediaRouter.get("/", checkMovieOnJSON, getOMDBData)

export default mediaRouter