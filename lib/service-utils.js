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
        res.send(OMDBResult.Search).status(200)
        // req.body = OMDBResult
        // const moviesJSONList = await getJSONMovies()
        
        // OMDBResult.forEach(movie => { moviesJSONList.push(movie)
            
        // });
        // const updatedList = moviesJSONList.push(...OMDBResult)
        // const flatedMoviesList = updatedList.flat()
        // console.log(OMDBResult, '<<<<<<Result')
        
        // req.body = OMDBResult
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const checkMovieOnJSON = async (req, res, next) => {
    try {
        if (req.query.search) {
            const moviesJSONList = await getJSONMovies()
            const filteredMovies = moviesJSONList.filter(movies => movies.Title.toLowerCase().includes(req.query.search.toLowerCase()))
            if (filteredMovies.length === 0) {
                console.log('inside if length 0')
                next()
            } else {
                console.log('hjdghdd')
                res.send(filteredMovies)
            }
            return
        }
        if (req.query.id) {
            const moviesJSONList = await getJSONMovies()
            const filteredMovie = moviesJSONList.find(movies => movies.imdbID === req.query.id)
            if (!filteredMovie) {
                next()
            } else {
                res.send(filteredMovie)
                return
            }
            return
        }

        const moviesJSONList = await getJSONMovies()
        res.send(moviesJSONList)
    } catch (error) {
        console.log(error)
        next(error)

    }
}

export const editMovie = async (req, res, next) => {
    try {
        const moviesJSONList = await getJSONMovies()
        const filteredMovie = moviesJSONList.find(movies => movies.imdbID === req.params.id)
        if (!filteredMovie) {
            res.status(404).send('Not found')
        } else {
            res.send(filteredMovie)
        }
        const remainingMovies = moviesJSONList.filter(movies => movies.imdbID !== req.params.id)
        const updatedMovie = {
            ...req.body,
            imdbID: req.params.id,
        }

        
        res.send(moviesJSONList)
    } catch (error) {
        console.log(error)
        next(error)

    }
}