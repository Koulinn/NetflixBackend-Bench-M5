import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from 'cloudinary'
import ImageDataURI from 'image-data-uri'
import PdfPrinter from "pdfmake"
import { pipeline } from "stream";
import { findMovie } from "./service-aux.js";
const { pdfMaker } = PdfPrinter




export const cloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Netflix-M5-Bench",
    },
})

export const PDFReviewsListGenerator = (movieReviews) => {
    try {
        const pdfReviewObjects = movieReviews.map(movie => {
            const pdfReviewText = [
                {
                    text: `Review: ${movie.comment}`,
                    margin: [0, 24, 0, 0],
                    fontSize: 16,
                    lineHeight: 1.4
                },
                {
                    text: `Score: ${movie.ratting}`,
                    margin: [0, 8, 0, 0],
                    fontSize: 12,
                    lineHeight: 1.4
                }
            ]
            return pdfReviewText
        })
        return pdfReviewObjects
    } catch (error) {
        console.log(error)
    }
}

export const PDFContentGenerator = async (movieData) => {
    try {
        const encondedPoster = await ImageDataURI.encodeFromURL(movieData.Poster)
        let reviewsList = [] 
        if(movieData.reviews && movieData.reviews.length !== 0){
            reviewsList = PDFReviewsListGenerator(movieData.reviews)
        }
        let content = [
            {
                text: `${movieData.Title}`,
                alignment: 'center',
                margin: [0, 0, 0, 24],
                fontSize: 24,
                bold: true
            },
            {
                image: encondedPoster,
                height: 350,
                margin: [105, 0, 0, 0],
            }
        ]
        if (!movieData.reviews || movieData.reviews.length === 0) {
            ('inside if')
            return content
        } else {
            // console.log(PDFReviewsListGenerator(movieData.reviews))
            // const reviewsList = PDFReviewsListGenerator(movieData.reviews)
            ('inside else')
            const flattenedReviewsList = reviewsList.flat()
            return [...content, ...flattenedReviewsList]
        }
    } catch (error) {
        console.log(error)
    }

}

export const createPDFSTREAM = async (movieData) => {
    try {
        const fonts = {
            Roboto: {
                normal: "Helvetica",
                bold: "Helvetica-Bold",
                italics: "Helvetica-Oblique",
                bolditalics: "Helvetica-BoldOblique",
            },
        }
        const printer = new PdfPrinter(fonts)
        const pdfContent = await PDFContentGenerator(movieData)

        // console.log(pdfContent, '<<<<<<<<<Pdf content')

        const docDefinition = {
            pageSize: 'A4',
            pageMargins: [40, 60, 40, 60],
            content: pdfContent
        }
        const options = {}
        const pdfReadableStream = printer.createPdfKitDocument(docDefinition, options)

        pdfReadableStream.end()
        return pdfReadableStream
    } catch (error) {
        console.log(error)
    }
}

export const createPDFPipeline = async (req, res, next) => {
    try {
        const movieData = await findMovie(req.params.id)
        // console.log(movieData, '<<<<< movie data') OK
        const source = await createPDFSTREAM(movieData)
        res.setHeader("Content-Disposition", `attachment; filename=${movieData.Title}.pdf`)
        const destination = res
        pipeline(source, destination, error => {
            if (error) {
                next(error)
            }
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}