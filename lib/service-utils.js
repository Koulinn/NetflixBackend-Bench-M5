import axios from "axios";
import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
const { readJSON, writeJSON } = fs

const metaPath = fileURLToPath(import.meta.url)
const movieDataJSONPath = join(dirname(metaPath), "../data/movies.json")

// Write
export const writeJSONMovies = JSONMovies => writeJSON(movieDataJSONPath, JSONMovies)
export const getJSONMovies = () => readJSON(movieDataJSONPath)



export const getOMDBData = async (req, res, next) => {
    try {
            const OMDBResponse = await axios.get(process.env.OMDB_API_SEARCH + req.query.search)
            const OMDBResult = OMDBResponse.data
            // req.body = OMDBResult
            res.send(OMDBResult.Search)
    } catch (error) {
        console.log(error)
        next(error)

    }
}

export const checkMovieOnJSON = async (req, res, next) => {
    try {
        if (req.query.search) {
            const moviesJSONList = await getJSONMovies()
            const filteredMovies = moviesJSONList.filter(movies=> movies.Title.toLowerCase().includes(req.query.search.toLowerCase()))
            if(filteredMovies.length === 0){
                next()
            } else {
                res.send(filteredMovies)
            }
        }
        if(req.query.id){
                const moviesJSONList = await getJSONMovies()
                const filteredMovie = moviesJSONList.find(movies=> movies.imdbID === req.query.id)
                if(!filteredMovie){
                    next()
                } else {
                    res.send(filteredMovie)
                }
            }
            
        const moviesJSONList = await getJSONMovies()
        res.send(moviesJSONList)
    } catch (error) {
        console.log(error)
        next(error)

    }
}