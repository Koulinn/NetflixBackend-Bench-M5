import axios from "axios";
import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
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
        moviesJSONList.push(OMDBResult)
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
            const filteredMovies = moviesJSONList.filter(movies => movies.Title.toLowerCase().includes(req.query.search.toLowerCase()))
            if (filteredMovies.length === 0) {
                next()
            } else {
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
            console.log(req.body)
            const moviesJSONList = await getJSONMovies()
            const filteredMovie = moviesJSONList.find(movies => movies.imdbID === req.params.id)
            if (!filteredMovie) {
                res.status(404).send('Not found')
            } else {
                const remainingMovies = moviesJSONList.filter(movies => movies.imdbID !== req.params.id)
                console.log(req)
                const updatedMovie = {
                    ...filteredMovie,
                    ...req.body,
                    imdbID: req.params.id,
                }
                remainingMovies.push(updatedMovie)
                await writeJSONMovies()
                res.send(updatedMovie).status(201)
            }
        }

    } catch (error) {
        console.log(error)
        next(error)
    }
}