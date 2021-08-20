import axios from "axios";
import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import uniqid from "uniqid"
const { readJSON, writeJSON } = fs

const metaPath = fileURLToPath(import.meta.url)
const movieDataJSONPath = join(dirname(metaPath), "../data/movies.json")

// Write
export const writeJSONMovies = JSONMovies => writeJSON(movieDataJSONPath, JSONMovies)
export const getJSONMovies = () => readJSON(movieDataJSONPath)



export const getOMDBData = async (req, res, next) => {
    try {
        const OMDBResponse = await axios.get(process.env.OMDB_API_SEARCH + req.query.search)
        const OMDBResult = OMDBResponse.data.Search
        const moviesJSONList = await getJSONMovies()
        
        if(OMDBResult !==undefined) moviesJSONList.push(OMDBResult)

        const flatedMoviesList = moviesJSONList.flat()
        writeJSONMovies(flatedMoviesList)

        res.send(OMDBResult).status(200)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const checkMovieOnJSON = async (req, res, next) => {
    try {
        if (req.query.search) {
            const moviesJSONList = await getJSONMovies()
            // console.log(moviesJSONList, '<<<<<<<<<<From check mov on JSON')
            const filteredMovies = moviesJSONList.filter(movies =>           
                     movies.Title.toLowerCase().includes(req.query.search.toLowerCase())
             )
            if (filteredMovies.length === 0) {
                console.log('going to IMDB')
                next()
            } else {
                console.log('from my JSON')
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

export const editMovieText = async (req, res, next) => {
    try {
        const errorList = validationResult(req)
        if (!errorList.isEmpty()) {
            next(createHttpError(400, { errorList }))
        }
        else {
            const moviesJSONList = await getJSONMovies()
            const filteredMovie = moviesJSONList.find(movies => movies.imdbID === req.params.id)
            if (!filteredMovie) {
                res.status(404).send('Not found')
            } else {
                const remainingMovies = moviesJSONList.filter(movies => movies.imdbID !== req.params.id)
                const updatedMovie = {
                    ...filteredMovie,
                    ...req.body,
                    imdbID: req.params.id,
                }
                remainingMovies.push(updatedMovie)
                await writeJSONMovies(remainingMovies)
                res.send(updatedMovie).status(201)
            }
        }

    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const addMovieJSON = async (req, res, next) => {
    try {
        const errorList = validationResult(req)
        if (!errorList.isEmpty()) {
            next(createHttpError(400, { errorList }))
        }
        else {
            const moviesJSONList = await getJSONMovies()
            const newMovie = {
                ...req.body,
                imdbID: uniqid(),
            }
            moviesJSONList.push(newMovie)
            await writeJSONMovies(moviesJSONList)
            res.send(newMovie).status(201)
        }

    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const deleteMovie = async (req, res, next) => {
    try {
        const moviesJSONList = await getJSONMovies()
        const remainingMovies = moviesJSONList.filter(movies => movies.imdbID !== req.params.id)
        await writeJSONMovies(remainingMovies)
        res.send({msg: `Movie with id ${req.params.id} deleted!`}).status(204)

    } catch (error) {
        console.log(error)
        next(error)
    }
}